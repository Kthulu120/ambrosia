// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './TitleBar.css';
import routes from '../../constants/routes';
import readGameDirectory from './../../internals/FileWatcher';

readGameDirectory('C:/Games');
type Props = {
};

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
          <h5>Library</h5>
        </div>
        <div className="d-inline-block mr-2">
          <h5>Community</h5>
        </div>
      </div>
    );
  }
}
