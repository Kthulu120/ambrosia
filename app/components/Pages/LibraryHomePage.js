// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'bluebird';
import routes from '../../constants/routes';
import GameCover from "../GameCover/GameCover"
import {launchers} from './../../internals/Core/Launchers'
import store from './../../index'
// Assets
import plus_circle from "../../assets/img/minus_circle.png"
import AmbrosiaApp from '../../internals/AmbrosiaApp';
import GameModel from "./../../internals/Models/Game"
import GameGal from '../../internals/Core/gamegal';

type Props = {
  installed_games: Array<Object>,
  setInstalledGamesRedux: Function
};

export default class LibraryHomePage extends Component<Props> {
  props: Props;

  componentDidMount(){
    this.props.setInstalledGamesRedux()
  }

  handleGameExecutable = (event: Event) => {
    this.setState({path_name: event.target.value})
    this.searchGameFromTitle(event.target.value)
  }

  handleLauncher = (event: Event) => {
    this.setState({launcher: event.target.value})
  }

  searchGameFromTitle(event){

  }

  handleAddGame = () => {
    //const doesExist = this.props.installed_games.some(ele => fullPath === ele)
    console.log(this.state)
    this.props.addVideoGame(this.state.path_name, this.state.launcher)
  }


  render() {
    return (
      <div className="height-full d-flex full-width">
      <div className="library-left-sidebar">
        <div className="d-flex flex-column height-full flex-shrink-0 border-right mt-2 mb-1 left-0 position-absolute library-left-sidebar">
          <details className="details-reset details-with-dialog mt-4">
            <summary>
              <i className="fas fa-plus mr-1" />
              Add Game
            </summary>
            <details-dialog className="details-dialog anim-fade-in fast wide" aria-label="Dialog" role="dialog" aria-modal="true" tabindex="-1">
              <div className="Box d-flex flex-column text-gray-dark">
                <div className="Box-header">
                  Add Game or Game Lbrary
                </div>
                <div className="Box-body overflow-auto d-flex flex-column">
                  Add Games and Folders here
                  <form>
                    <div className="d-flex flex-justify-around">
                      <input type="text" onChange={this.handleGameExecutable} type="file" name="gameExecutable" />
                      <select onChange={this.handleLauncher}>
                        {Object.keys(launchers).map((launcher) => <option key={launcher} value={launcher}>{launcher}</option>)}
                      </select>
                    </div>

                  </form>
                </div>
                <div className="Box-footer d-flex flex-justify-around">
                  <button className="btn" onClick={this.handleAddGame}>Submit</button>
                  <button type="button" className="btn" data-close-dialog="">Close</button>
                </div>
              </div>
            </details-dialog>
          </details>
        </div>
      </div>

        <div className="d-flex col-11 flex-row">
          <div className="mb-3 width-full" style={{height: '16px', borderBottom: '2px solid #0f4a81', textAlign: 'left'}}>
            <span className="pr-2" style={{fontSize: '20px', color: '#F3F5F6', backgroundColor: '#191922'}}>
              All Games
            </span>
            <div className="d-flex flex-row flex-wrap">
            {
              this.props.installed_games.map((game) => <GameCover game={game} key={game.title} title={game.title}/>)
            }
            </div>
          </div>
          <div className="col-1 d-flex"><img className="plus-minus-toggle" src={plus_circle} /></div>
        </div>
      </div>
    );
  }
}
