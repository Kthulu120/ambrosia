/* eslint-disable react/destructuring-assignment */
// @flow

import React, { Component } from 'react';
import styles from './index.css'

export function DialogHeader(props) {
  return (
    <div className="px-4 dialog-header">
      <button className="float-right border-none" type="button" aria-label="Close dialog" data-close-dialog="true">X</button>
      <h3 className="Box-title">{props.title || props.children}</h3>
    </div>
  )
}


type Props = {
  header: string | React.ReactNode,
  onSubmit: Function | undefined,
  onClose: Function | undefined,
  bottomButtons: string | React.ReactNode | undefined,
  bodyClassName: string | undefined,
  children: React.ReactNode | undefined
}

class DetailDialog extends Component<Props> {

  static defaultProps = {
  bottomButtons: [
    <button
      type='button'
      className='btn-block btn-cancel rounded-1 py-2'
      data-close-dialog>
      onClick={this.props.onClose}
      Close
    </button>,
    <button
      type='button'
      className='btn-block rounded-1 py-2'
      onClick={this.props.onSubmit}
      data-close-dialog>
      Submit
    </button>
  ],
  bodyClassName: ''
}

  render () {
    return (
      <details-dialog className="Box Box--overlay d-flex flex-column anim-fade-in fast ambrosia-dialog">
        <DialogHeader title={this.props.header}/>
        <div className={`overflow-auto dialog-body ${this.props.bodyClassName}`}>
          <div className="overflow-auto d-flex py-6 px-2">
            {this.props.children}
          </div>
          <div className="d-flex">
            {this.props.bottomButtons}
          </div>
        </div>
      </details-dialog>
    )
  }
}

export default DetailDialog

