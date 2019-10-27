import React, { Component } from 'react';
import {createFragmentContainer, graphql} from 'react-relay';


class MessageBubble extends React.Component {
  render() {
    // Expects the `item` prop to have the following shape:
    // {
    //   item: {
    //     text,
    //     isComplete
    //   }
    // }
    const message = this.props.message;
    const isViewerMessageClass = this.props.viewerId === message.sender.id ? 'speech-bubble-right': 'speech-bubble-right';
    return (
      <div className={isViewerMessageClass}>
        {message.content}
      </div>
    );
  }
}


export default createFragmentContainer(MessageBubble, {
  // For each of the props that depend on server data, we define a corresponding
  // key in this object. Here, the component expects server data to populate the
  // `item` prop, so we'll specify the fragment from above at the `item` key.
  message: graphql`
    fragment MessageBubble_message on MessageNode {
      id
      readAt
      sentAt
      content
      sender {
        id
      }
    }
  `,
});


