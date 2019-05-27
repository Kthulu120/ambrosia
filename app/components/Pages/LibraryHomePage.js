// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import { map } from 'bluebird';
import GameCover from './../GameCover/GameCover'
import styles from './LibraryHomePage.css'
// Assets
import plus_circle from './../../assets/img/minus_circle.png'

type Props = {
  installed_games: Array<Object>,
  decrement: () => void,
};
const flip = false
export default class LibraryHomePage extends Component<Props> {
  props: Props;


  render() {
    return (
      <div className="container">
      <div className="d-flex flex-row">
        <div className={"mb-3 col-11 "} style={{height: '16px', borderBottom: '2px solid #0f4a81', textAlign: 'left'}}>
          <span className={"pr-2 "} style={{fontSize: '20px', color: '#F3F5F6', backgroundColor: '#191922'}}>
            All Games
          </span>
        </div>
        <div className="col-1 d-flex"><img className={styles.plus_minus_toggle} src={plus_circle} /></div>
      </div>
      <div className=""></div>
        {
          this.props.installed_games.map((game) => {
            return <GameCover game={game} title={game.title}></GameCover>
          })
        }
      </div>
    );
  }
}
