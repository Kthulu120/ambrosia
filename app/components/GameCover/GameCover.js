// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameCover.css'
import { Game } from '../../internals/Games/Game';

type Props = {
   src: '',
   game: Game
};
//file:///C:/Users/Colon/Downloads/Ambrosia/Idea%20Imaes/f3b84678966289.5cc0a75c9a798.png

export default class GameCover extends Component<Props> {
  props: Props;

  render() {
    return (
      <div  onClick={(event) => this.props.game.launch()} className={styles.gameCover}>
        <img alt={this.props.game.title} title={this.props.game.get('title')} src={`file:///${this.props.game.get('cover_img')}`} />
      </div>
    );
  }
}
