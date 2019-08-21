// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import LauncherSettings from './../Settings/LauncherSettings'

type Props = {};

export default class Settings extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {
      tabSelected: 'launcher',
    }
  }

  renderSelectedTab = (tabName: String) => {
    switch (tabName){
      case 'launcher':
        return <LauncherSettings settings={this.props.settings} addLauncherModel={this.props.addLauncherModel} removeLauncherModel={this.props.removeLauncherModel} />
    }
  }


  render() {
    return (
      <div className="d-flex flex-shrink-0" data-tid="container">
        <div className="library-left-sidebar">
          <h4>Settings</h4>
          <ul className="d-flex flex-column">
            <li onClick={() => this.setState({tabSelected: 'launcher'})}>Launcher</li>
          </ul>
        </div>
        <div>
          {this.renderSelectedTab(this.state.tabSelected)}
        </div>
      </div>
    );
  }
}
