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
      <div className="container d-flex flex-column height-full">
        <div className="d-flex flex-column">
          <div className="banner d-flex d-column">

          <div className="d-flex flex-row">
            <div className="col-1 btn">Play</div>

            <div className="d-flex flex-column">
              <p className="">Last Played</p>
              <p>Apr 10</p>
            </div>

            <div className="d-flex flex-column">
              <p className="">Playtime</p>
              <p>13 hours</p>
            </div>
          </div>
          </div>

          <p>Friends Who Play</p>
          <div className="d-flex flex-row game-friends">
          </div>
          <p>News</p>
          <div className="d-flex flex-row game-news"></div>
        </div>
      <div className="d-flex flex-column">

      <span>Played Recnetly</span>

      </div>

      </div>
    );
  }
}
