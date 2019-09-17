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

  componentDidMount(){
    this.props.setInstalledLaunchersRedux()
    this.props.loadGameLibraries()
  }

  renderSelectedTab = (tabName: String) => {
    switch (tabName){
      case 'launcher':
        return <LauncherSettings settings={this.props.settings} addLauncherModel={this.props.createLauncherModel} removeLauncherModel={this.props.removeLauncherModel} />
    }
  }

  sidebarStyle = () => {
    return {
      borderLeft: '4px solid blue'
    }
  }


  render() {
    return (
      <div className="d-flex flex-shrink-0 height-full" data-tid="container">
        <div className="library-left-sidebar border-right height-full">
          <h3 className="pl-2">Settings</h3>
          <ul className="d-flex flex-column">
            <li onClick={() => this.setState({tabSelected: 'launcher'})} className={'pl-3 mt-1'} style={this.state.tabSelected == 'launcher' ? this.sidebarStyle() : {}}>Launcher</li>
          </ul>
        </div>
        <div>
          {this.renderSelectedTab(this.state.tabSelected)}
        </div>
      </div>
    );
  }
}
