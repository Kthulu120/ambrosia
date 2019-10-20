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
    const {className, onChange, placeholder } = this.props;
    return (
      <input {...this.props} onChange={onChange} placeholder={placeholder || ''} className={`p-1 ambrosia-search ${className}`} />
    )
  }
}
