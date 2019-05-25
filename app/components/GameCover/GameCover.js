// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameCover.css'
import { Game } from '../../internals/Games/Game';
type Props = {
   src: '',
   game: Game,
};

export default class GameCover extends Component<Props> {
  props: Props;



  render() {
    return (
      <div onClick={(event) => this.props.game.launch()} className={styles.gameCover}>
        <img src={'https://i.imgur.com/1LHqhNY.jpg'}></img>
      </div>
    );
  }
}
