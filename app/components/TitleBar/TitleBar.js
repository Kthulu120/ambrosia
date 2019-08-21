// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './TitleBar.css';
import routes from '../../constants/routes';
import readGameDirectory from './../../internals/FileWatcher';

readGameDirectory('C:/Games');
type Props = {
};
console.log(window.location.href)
//const dd = window.location.href
//window.location.href = `http://127.0.0.1:8000/ambrosia/login?callback=${JSON.stringify(dd)}`
export default class TitleBar extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.barContainer}>
        <div className="d-inline-block ml-3 mr-4">
            <h5>GD</h5>
        </div>

        <div className="d-inline-block mr-2">
          <div className="d-inline-block p-3 backButton">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="d-inline-block p-3 fowardButton">
            <i className="fa fa-chevron-right" />
          </div>
          <input className={styles.titleSearch}></input>
        </div>

        <div className="d-inline-block mr-2 pt-3 pb-3">
          <h5>Store</h5>
        </div>
        <div className="d-inline-block mr-2">
          <Link to={routes.LIBRARY}><h5>Library</h5></Link>
        </div>
        <div className="d-inline-block mr-2">
        <Link to={routes.SETTINGS}><h5>Settings</h5></Link>
        </div>


        <div className="float-right mr-3 p-1">
          <img className={styles.userIcon} width="50px" height="50px" src="https://via.placeholder.com/50"></img>
        </div>
      </div>
    );
  }
}
