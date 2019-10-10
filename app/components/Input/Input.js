// @flow

import React, { Component } from 'react';

type Props = {
  theme: 'light' | 'dark',
  onChange: Function,
  value: '',
  placeholder: String
}

export default class Input extends Component<Props> {
  props: Props;

  render(){
    return (
      <input {...this.props} onChange={this.props.onChange} placeholder={this.props.placeholder || ''} className={"p-1 ambrosia-search " + this.props.className}></input>
    )
  }
}
