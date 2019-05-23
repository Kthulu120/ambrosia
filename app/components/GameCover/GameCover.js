// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameCover.css'
type Props = {
   src: ''
};

export default class GameCover extends Component<Props> {
  props: Props;



  render() {
    return (
      <div onClick={(event) =>
      {
        
      }} className={styles.gameCover}>
        <img src={'https://i.imgur.com/1LHqhNY.jpg'}></img>
      </div>
    );
  }
}
