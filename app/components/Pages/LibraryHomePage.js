// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'bluebird';
import routes from '../../constants/routes';
import GameCover from "../GameCover/GameCover"
import styles from './LibraryHomePage.css'
// Assets
import plus_circle from "../../assets/img/minus_circle.png"

type Props = {
  installed_games: Array<Object>
};

export default class LibraryHomePage extends Component<Props> {
  props: Props;


  render() {
    return (
      <div className="container">
        <div className="d-flex flex-row mt-2 mb-1">
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
                <div className="Box-body overflow-auto">
                  Add Games and Folders here
                </div>
                <div className="Box-footer">
                  <button type="button" className="btn btn-block" data-close-dialog="">Close</button>
                </div>
              </div>
            </details-dialog>
          </details>




        </div>

        <div className="d-flex flex-row">
          <div className="mb-3 col-11 " style={{height: '16px', borderBottom: '2px solid #0f4a81', textAlign: 'left'}}>
            <span className="pr-2 " style={{fontSize: '20px', color: '#F3F5F6', backgroundColor: '#191922'}}>
              All Games
            </span>
          </div>
          <div className="col-1 d-flex"><img className={styles.plus_minus_toggle} src={plus_circle} /></div>
        </div>
        <div className="d-flex flex-row flex-wrap">
          {
            this.props.installed_games.map((game) => <GameCover game={game} title={game.title}/>)
          }
          </div>
      </div>
    );
  }
}
