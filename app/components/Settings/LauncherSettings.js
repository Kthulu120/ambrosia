// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import Select from 'react-select'
import LauncherModel from './../../internals/Models/Launcher'
import {launchers} from './../../internals/Core/Launchers'
import FileSystem from '../../internals/Core/FileSystem';
import slash from './../../internals/Core/slash'
import AmbrosiaApp from './../../internals/AmbrosiaApp'

type Props = {
  configuredLaunchers: Array<LauncherModel>,
};

const VIABLE_LAUNCHERS = [{label: "PCSX2", value: "PCSX2"}]


export default class LauncherSettings extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {
      tabSelected: 'launcher',
      pendingLauncherGameFolders: [],
      pendingDefaultInstallLocation: null,
      editLauncherPanel: {
        gameLibraries: [],
      }
    }
  }

  handleGameExecutable = (event: Event) => {
    if(event.target.files){
      this.setState({executable_path: slash(event.target.files[0].path)})
    }
  }

  handleLauncherFlags = (event: Event) => {
    this.setState({launcher_flags: event.target.value})
  }

  // Check if the save files and config is in default location otherwise we won't back up for now
  // doing this now to avoid over-configuration
  checkDefaultConfigInstallationLocation = () => {
    const homeDir = FileSystem.getHomeDir()
    if(FileSystem.isWindowsOS() &&  FileSystem.pathExists(`${homeDir}/Documents/PCSX2`)){
      return `${homeDir}/Documents/PCSX2`
    }else if(FileSystem.pathExists(`${homeDir}/.config/pcsx2`)){
      return `${homeDir}/.config/pcsx2`
    }
    return null
  }

  handleAddGameLibrary = (event: Event) => {
    const files = event.target.files
    if (files){
      const folders = this.state.pendingLauncherGameFolders
      folders.push(files[0].path)
      this.setState({pendingLauncherGameFolders: folders})
    }
  }

  removeGameLibrary = (game_folder) => {
    let folders = this.state.pendingLauncherGameFolders
    folders = folders.filter((ele) => ele !== game_folder)
    this.setState({pendingLauncherGameFolders: folders})
  }

  handleLauncher = (selectOption) => {
    this.setState({launcher_name: selectOption.value, pendingDefaultInstallLocation: this.checkDefaultConfigInstallationLocation()})
  }



  addLauncher = (event: Event) => {
    const { launcher_name, launcher_flags, executable_path, pendingLauncherGameFolders } = this.state
    if( launcher_name && executable_path ) {
      this.props.addLauncherModel(launcher_name, launcher_flags, executable_path, pendingLauncherGameFolders)
    }
  }

  setEditLauncherDialog = (launcher) => {
    const panelInformation = this.state.editLauncherPanel
    panelInformation.gameLibraries = this.props.settings.game_libraries.filter((libr) => libr.get('launcher_name') === launcher.get('name'))
    this.setState({ editLauncherPanel: panelInformation })
  }

  removeLauncher = (launcher_id) => {
    this.props.removeLauncherModel(launcher_id)
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <details className="details-reset details-with-dialog">
          <h4>Launchers</h4>
          <summary>+ Add Launcher</summary>
          <details-dialog>
          <div className="Box d-flex flex-column text-gray-dark">
          <div className="Box-header">
            Add Game Launcher
          </div>
          <div className="Box-body d-flex flex-column">
            <form>
              <div className="d-flex f5">
                <span className="mr-3">Launcher Type:</span>
                <Select cacheOptions options={VIABLE_LAUNCHERS} styles={{container: (provided) => ({...provided, minWidth: '200px'})}} onChange={this.handleLauncher}></Select>
              </div>
              <div className="d-flex f5">
                <span className="mr-3">Add Game Libraries(optional):</span>
                <input type="file" onChange={this.handleAddGameLibrary} webkitdirectory="true" directory="true" />
              </div>
              { this.state.pendingLauncherGameFolders.map((ele) => <div key={ele} className="d-flex"> {ele} <i onClick={() => this.removeGameLibrary(ele)} className="fa fa-times mt-1 ml-1"></i></div>)}
              <div className="d-flex flex-column mt-2 flex-justify-around">
                <div className="d-flex f5 my-2">
                  <div className="pr-2">Launcher Executable:</div>
                  <input type="text" onChange={this.handleGameExecutable} aria-label="path to executable" type="file" name="gameExecutable" />
                </div>
                <div className="d-flex mt-1">
                  <span className="mr-2">Launcher Flags</span>
                  <input type="text" onChange={this.handleLauncherFlags} aria-label="launcher flags"/>
                </div>
              </div>
            </form>
          </div>
          <div className="Box-footer d-flex flex-justify-around">
            <button className="btn" onClick={this.addLauncher} data-close-dialog>Submit</button>
            <button type="button" className="btn" data-close-dialog>Close</button>
          </div>
        </div>
          </details-dialog>
        </details>
        {this.props.settings.installed_launchers.map((launcher) => <div className="bg-gray text-black rounded-1 text-gray-dark m-2">

          <details className="details-reset details-with-dialog">
          <summary className="f4 p-3" onClick={() => this.setEditLauncherDialog(launcher)}>{launcher.get('name')}</summary>
          <details-dialog>
          <div className="Box d-flex flex-column text-gray-dark">
          <div className="Box-header">
            Edit Launcher
          </div>
          <div className="Box-body d-flex flex-column">
            <form>
              <div className="d-flex f5">
                <span className="mr-3">Launcher Type:</span>
                <Select cacheOptions options={VIABLE_LAUNCHERS} isDisabled={true} defaultValue={launcher.get('name')} styles={{container: (provided) => ({...provided, minWidth: '200px'})}} onChange={this.handleLauncher}></Select>
              </div>
              <div className="d-flex f5">
                <span className="mr-3">Add Game Libraries(optional):</span>
                <input type="file" onChange={this.handleAddGameLibrary} webkitdirectory="true" directory="true" />
              </div>
              { this.state.pendingLauncherGameFolders.map((ele) => <div key={ele} className="d-flex"> {ele} <i onClick={() => this.removeGameLibrary(ele)} className="fa fa-times mt-1 ml-1"></i></div>)}
              <div className="d-flex flex-column mt-2 flex-justify-around">
                <div className="d-flex f5 my-2">
                  <div className="pr-2">Launcher Executable:</div>
                  <input type="text" onChange={this.handleGameExecutable} defaultValue={launcher.get('file_path')} aria-label="path to executable" type="file" name="gameExecutable" />
                </div>
                <div className="d-flex mt-1">
                  <span className="mr-2">Launcher Flags</span>
                  <input type="text" onChange={this.handleLauncherFlags} aria-label="launcher flags"/>
                </div>
              </div>
            </form>
          </div>
          <div className="Box-footer d-flex flex-justify-around">
            <button className="btn" onClick={this.addLauncher} data-close-dialog>Submit</button>
            <button type="button" className="btn" data-close-dialog>Close</button>
          </div>
        </div>
          </details-dialog>
        </details>
        </div>)}
      </div>
    );
  }
}
