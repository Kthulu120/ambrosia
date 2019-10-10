// @flow
import React, { Component } from 'react';
import Launcher from './../../internals/Models/Launcher'
import Table from 'rc-table'
import FileChooser from '../FileChooser'
import slash from './../../internals/Core/slash'
import xCircleIcon from './../../assets/icons/x-circle.png'



export default class LauncherSettings extends Component<Props> {
  props: Props;
  // TODO: Add OS dependent place to put games in Dialog help text

  constructor(props) {
    super(props);
    this.state = {
      gameLibraryPath: '',
      launcher_name: props.installed_launchers ? props.installed_launchers[0].name : ''
    }
  }

  numberCircleCls = () => (
    "circle border-gray-light border p-1 d-block v-align-middle mr-2"
  )

  submitAddGameLibrary = () => {
    const { launcher_name, gameLibraryPath} = this.state
    if(launcher_name && gameLibraryPath){
      this.props.addGameLibrary(gameLibraryPath, launcher_name)
    }
  }

  isSubmitDisabled = () => {
    const { launcher_name, gameLibraryPath} = this.state
    return !(launcher_name !== '' && gameLibraryPath !== '')
  }

  numberCircleStyle = () => ({
    height: 32,
    width: 32,
    minWidth: 32
  })

  addGameLibraryDialog = () => (
    <details-dialog className="Box Box--overlay d-flex flex-column anim-fade-in fast ambrosia-dialog" style={{width: 550}}>
        <div class="Box-header dialog-header">
          <button class="float-right border-none" type="button" aria-label="Close dialog" data-close-dialog>
            <img height={20} src={xCircleIcon} />
          </button>
          <h3 class="Box-title"> Add Game Library </h3>
        </div>
        <div class="overflow-auto dialog-body">
          <div class="Box-body overflow-auto d-flex py-6">
            <div className="px-2 d-flex flex-column">
              <div className="d-flex  my-2">
                <span className={`${this.numberCircleCls()}`} style={this.numberCircleStyle()}> 1 </span>
                <span className="width-full pt-2">Select Folder</span>
              </div>
              <div className="d-flex my-2">
                <span className={`${this.numberCircleCls()}`} style={this.numberCircleStyle()}> 2 </span>
                <span className="width-full">{`Choose the game launcher that games in this folder should launch using (Alternatively you can place games according to launcher in: C:/ProgramFiles(86x)/Ambrosia/<Game Launcher Name>) `}</span>
              </div>

              <div className="d-flex">
                <span className="pr-2">Choose Game Folder:</span>
                <FileChooser onChange={(files) => this.setState({gameLibraryPath: slash(files[0].path)})} webkitdirectory={'true'} />
              </div>

              <div className="d-flex mt-2">
                <span className="mr-2">Launcher:</span>
                <select defaultValue={this.props.installed_launchers[0].name}>
                  {this.props.settings.installed_launchers.map((launcher => <option value={launcher.name}>{launcher.name}</option>))}
                </select>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <button type="button" onClick={this.submitAddGameLibrary} disabled={this.isSubmitDisabled()} class="btn-block rounded-1 py-2 play-btn" data-close-dialog>Submit</button>
            <button type="button" class="btn-block btn-cancel rounded-1 py-2" data-close-dialog>Close</button>
          </div>
        </div>
      </details-dialog>
  )

  getTableColumns = () => ([
    {title: 'Folder Path', key: 'file_path', dataIndex: 'title', width: '40%', className: "py-2  game-title", render: (val, row) => <span className="ml-2" style={{fontSize: 14}}>{row.file_path}</span>},
    {title: 'Launcher', key: 'name', dataIndex: 'title', mwidth: 400, className: "py-2 d-flex flex-justify-center", render: (val, row) => <img src={Launcher.getGameLauncherIcon(row.launcher)}/>},
    { title: <details className="details-reset"><summary><div className="px-2 py-1 play-btn rounded-2 bright">Add Game Library</div></summary> {this.addGameLibraryDialog()} </details>, dataIndex: '', key: 'remove', className: 'text-center', width: 150, render: (o, row) => <div onClick={() => this.props.deleteGameLibrary(row)} className="px-4 py-1 play-btn rounded-2">Remove</div>}
  ])

  render(){
    return (
      <div>
        <Table tableClassName={"width-full"} tableLayout={'auto'} className={"width-full pl-2"} rowClassName={'p-3'} prefixCls={'game-table width-full'} columns={this.getTableColumns()} data={this.props.game_libraries} />
      </div>
    )
  }
}
