/* eslint-disable react/no-multi-comp */
/* eslint-disable promise/catch-or-return */
// @flow
import React, { Component } from 'react';
import axios from 'axios'
import AsyncSelect from 'react-select/async';
import ChatList from '../../components/ChatList';

type Props = {};


const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const colourStyles = {
  // control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    console.log(data)
    const img = `url(http://127.0.0.1:8000/media/${data.image})`
    return {
      ...styles,
      ':before': {
        width: 24,
        height: 24,
        marginRight: 8,
        background: img,
        content: "",
      },
      color: 'black'
    }
  },
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  input: styles => ({ ...styles }),
  placeholder: styles => ({ ...styles }),
  singleValue: (styles, { data }) => ({ ...styles})
};


const promiseOptions = inputValue =>
  new Promise(resolve => {
    axios.create({
      url: 'http://127.0.0.1:8000/auth/graphql',
      method: 'post',
      data: {
        'query': `
      {
        users(username_Icontains: "${inputValue}", first: 10) {
          edges {
            node {
              id
              username
              profile{
                avatar
              }
            }
          }
        }
      }
    `
  },
    headers: {
        Authorization: 'Token ' + JSON.parse(localStorage.getItem("settings")).access_token
      }
  }).post().then( (response) => {
      return resolve(response.data.data.users.edges.map(ele => ({label: ele.node.username, value: ele.node.id, image: ele.node.profile.avatar})))
    })
  });

const CustomOption = ({data, isDisabled, innerProps, label, selectProps}) => {
  const image = data.image ? `http://127.0.0.1:8000/media/${data.image}` : "http://127.0.0.1:8000/media/default_profile.png"
  return  !isDisabled ? (
    <div {...innerProps} className="select-option py-2 border-y border-light-gray d-flex flex-items-center">
      <img className="mx-2 circle" alt="profile" height={32} width={32} src={image} />
      {label}
    </div>
  ) : null

};

//
class WithPromises extends Component {
  render() {
    return (
      <AsyncSelect styles={colourStyles} cacheOptions defaultOptions loadOptions={promiseOptions}
        components={{Option: CustomOption}} />
    );
  }
}


export default class MessagePage extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {
      currentChatId: ""
    }
  }

  render() {
    return (
      <div className="width-full height-full d-flex">
        <div className="inner-sidebar d-flex flex-column" style={{width: '40%'}}>
          <WithPromises  />
          <ChatList userID={this.props.userID} />
        </div>
        <div>
          <div id="user_avatar d-flex" className="">
            <img />
            <div className="d-flex flex-column">
              <div>User_name</div>
              <div>playing_status</div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
