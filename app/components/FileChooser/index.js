// @flow

import React, { Component } from 'react';
import folderIcon from './../../assets/icons/folder.svg'
import slash from './../../internals/Core/slash'

type Props = {
  onChange: Function,
  text: String,
  folderSelect: String
}

export default class FileChooser extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      fileChosen: null
    }

  }

  static defaultProps = {
    text: 'Choose Folder',
    onChange: (event) => {
      return event.target.value
    },
    folderSelect: false
  }

  clickFileInput = () => {
    this.textInput.current.click()
    }

  handleFileChange = (event) => {
    // safely wrap our path in linux and Windows safe format
    if (event.target.files){
      this.setState({ fileChosen: slash(event.target.files[0].path)})
      this.props.onChange(event.target.files)
    }
  }

  render(){
    return (
      <span className="d-flex no-wrap">
        <button className="px-2 py-1 play-btn rounded-2 bright" onClick={this.clickFileInput}>
          <img src={folderIcon} className="mr-1"/>
          {this.props.text}
          <input type="file" webkitdirectory={this.props.folderSelect} onChange={this.handleFileChange} ref={this.textInput} className="d-none"></input>
        </button>
        <span className="ml-1" style={{maxWidth: 200, whiteSpace: 'nowrap', overflowX: 'auto'}}>{this.state.fileChosen} </span>
      </span>
    )
  }
}
