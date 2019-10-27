// @flow
import React, { Component } from 'react';
import axios from 'axios'
import AsyncSelect from 'react-select/async';

type Props = {};


const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    axios.create({
      baseURL: 'http://127.0.0.1:8000/auth/graphql',
      method: 'post',
      params: {
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
        Authorization: 'Token 17e2e1d4fe09dd648f84176c43d4d9d162bf287f'
      }
  }).get().then( (response) => {
      console.log(response)
      resolve([])
    })
  });
//response.data.data.users.edges
class WithPromises extends Component {
  render() {
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
    );
  }
}


export default class MessagePage extends Component<Props> {
  props: Props;

  render() {
    //const ChatArea = <div></div>

    return (
      <div className="width-full height-full">
        <div className="inner-sidebar d-flex flex-column">
          <WithPromises />

        </div>
        <div>Chat area</div>
      </div>
    );
  }
}
