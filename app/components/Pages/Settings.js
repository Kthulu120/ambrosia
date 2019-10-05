// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import LauncherSettings from './../Settings/LauncherSettings'
import styles from './Settings.css'
import xCircleIcon from './../../assets/icons/x-circle.png'
import LibrarySettings from './../Settings/LibrarySettings'

type Props = {};
/**
 * The Settings Modal
 */
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
        return <LauncherSettings settings={this.props.settings} installed_launchers={this.props.installed_launchers}  addLauncherModel={this.props.createLauncherModel} removeLauncherModel={this.props.removeLauncherModel} />
      case 'library':
        return <LibrarySettings settings={this.props.settings}  installed_launchers={this.props.installed_launchers} game_libraries={this.props.settings.game_libraries} addGameLibrary={this.props.addGameLibrary} deleteGameLibrary={this.props.deleteGameLibrary}  />
    }
  }

  sidebarStyle = () => {
    return {
      backgroundColor: '#2F3136',
      width: 125
    }
  }


  render() {
    return (
      <details-dialog class="d-flex flex-shrink-0 height-full width-full position-absolute settings-detail" style={{zIndex: 100, top:0, left:0, backgroundColor: '#2F3136'}} data-tid="container">
        <div className={styles['settings-sidebar']}>
          <h3 className="pl-2 text-right pr-3">Settings</h3>
          <ul className="d-flex flex-column text-right pr-3">
            <li onClick={() => this.setState({tabSelected: 'launcher'})} className={'pl-3 mt-1 rounded-1'}>
              <div className={'px-4 f4 py-1  rounded-1 width-fit width-auto d-inline-block'} style={this.state.tabSelected == 'launcher' ? this.sidebarStyle() : {}}>Launchers</div>
            </li>
            <li onClick={() => this.setState({tabSelected: 'library'})} className={'pl-3 mt-1 rounded-1'}>
              <div className={'px-4 f4 py-1  rounded-1 width-fit width-auto d-inline-block'} style={this.state.tabSelected == 'library' ? this.sidebarStyle() : {}}>
                Library
              </div>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-column width-full">
          <div className="width-full flex-items-end d-flex flex-justify-end">
            <span className="d-flex flex-column" data-close-dialog>
              <img className="mr-4 mt-3" src={xCircleIcon}/>
              ESC
            </span>
          </div>
          {this.renderSelectedTab(this.state.tabSelected)}
        </div>
      </details-dialog>
    );
  }
}
