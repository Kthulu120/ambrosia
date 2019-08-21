// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import Select from 'react-select'
import LauncherModel from './../../internals/Models/Launcher'
import {launchers} from './../../internals/Core/Launchers'


type Props = {
  configuredLaunchers: Array<LauncherModel>,
};

const VIABLE_LAUNCHERS = [{label: "PCSX2", value: "PCSX2"}, {label: "PC", value: "PC"}]


export default class LauncherSettings extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {
      tabSelected: 'launcher',
    }
  }

  handleGameExecutable = (event: Event) => {
    this.setState({executable_path: event.target.value})
  }

  handleLauncherFlags = (event: Event) => {
    this.setState({launcher_flags: event.target.value})
  }

  handleLauncher = (selectOption) => {
    this.setState({launcher_name: selectOption.value})
  }



  addLauncher = () => {
    const { launcher_name, launcher_flags, executable_path  } = this.state
    if( launcher_name && launcher_flags && executable_path) {
      this.props.addLauncherModel(launcher_name, launcher_flags, executable_path)
    }
  }

  removeLauncher = (launcher_id) => {
    this.props.removeLauncherModel(launcher_id)
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <details className="details-reset details-with-dialog">
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
            <button className="btn" onClick={this.addLauncher}>Submit</button>
            <button type="button" className="btn" data-close-dialog>Close</button>
          </div>
        </div>
          </details-dialog>
        </details>

      </div>
    );
  }
}
