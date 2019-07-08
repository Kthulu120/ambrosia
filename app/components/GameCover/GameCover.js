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

// https://e.snmc.io/lk/l/x/3e21194bf5999205651a751ce242b936/6849472

  render() {
    return (
      <div  onClick={(event) => this.props.game.launch()} className={styles.gameCover}>
        <img alt={this.props.game.name} title={this.props.game.name} src={this.props.game.cover_img}></img>
      </div>
    );
  }
}
