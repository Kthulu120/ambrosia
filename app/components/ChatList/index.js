// @flow

import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './../../environment'
import humanizeGraphQLResponse from './../../internals/graphQLHelpers'
type Props = {
}

const ChatRow = ({node, userID}) => {
  let chatAvatar, username = ""
  const { isDm, members, avatar, messages } = node
  const messageSnippet = messages.edges.length > 0 ? messages.edges[0].node.content.substring(0,20) : ""
  let recipient = members.edges.find((ele) => {console.log(ele.node); return ele.node.id !== userID})

  if (recipient && recipient.node){
    chatAvatar = recipient.node.profile.avatar
    username = recipient.node.username
  }
  chatAvatar = chatAvatar && isDm ? chatAvatar : "default_profile.png"
  return (
    <div className="d-flex align-items-center width-full">
      <img className="circle" height={64} width={64} src={`http://127.0.0.1:8000/media/${chatAvatar}`} />
      <div className="d-flex flex-column width-full">
        <p>{username || "Chat"}</p>
        <p className="overflow-hidden width-full">{messageSnippet}</p>


      </div>

    </div>
  )
}

export default class ChatList extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {}
  }



  renderChat = ({error, props}) => {
    if(!props || !props.viewer){
      return null
    }
    return (<div className="flex-column d-flex">
      {console.log(props, this.props)}

      {props.viewer.chatrooms.edges.map((ele) => <ChatRow node={ele.node} userID={this.props.userID} />)}

    </div>
  )}

  render(){
    const {className, onChange, placeholder } = this.props;
    return (
        <QueryRenderer
          environment={environment}
          query={graphql`
            query ChatListQuery{
              viewer{
                chatrooms{
                  edges{
                    node{
                      id
                      isDm
                      messages(last: 1){
                        edges{
                          node{
                            content
                          }
                        }
                      }
                      members(first:2){
                        edges{
                          node{
                            id
                            username
                            profile{
                              avatar
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `}
          variables={{}}
          render={this.renderChat}
          />
    )
  }
}


