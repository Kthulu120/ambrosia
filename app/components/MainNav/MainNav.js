/* eslint-disable jsx-a11y/img-redundant-alt */
// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './mainnav.scss';
import routes from '../../constants/routes';
import SettingsPage from "../../containers/SettingsPage"
// Icons
import mainLogo from "../../assets/logo/Ambrosia_64.png"
import homeIcon from "../../assets/icons/home icon.png"
import mailIcon from "../../assets/icons/mail icon.png"
import friendsIcon from "../../assets/icons/users icon.png"
import settingsIcon from "../../assets/icons/settings.png"
import defaultProfileIcon from "../../assets/img/default_profile.png"
import { QueryRenderer, graphql } from 'react-relay';
import environment from './../../environment'

type Props = {
};
export default class MainNav extends Component<Props> {
  props: Props;

  renderProfile = ({error, props}) => {
    let profilePic;
    console.log(props)
    if (props){
      profilePic = <img className="circle" src={props.viewer.avatar} height={48} width={48} alt="picture" />
    }
    else{
      profilePic = <img className="circle" src={defaultProfileIcon} height={48} width={48} alt="picture" />
    }

    return (
      <div className="flex-shrink-0 d-flex ml-3 mb-2 flex-items-center" style={{marginTop: 'auto'}}>
        {profilePic}
        {props && props.viewer && props.viewer.username ? <span className="ml-2 f4 flex-align-center">{props.viewer.username}</span> : <Link className="ml-2 f4 flex-align-center" to={routes.LOGIN}>Login</Link>}
        <details className="details-overlay details-reset details-overlay-dark list-style-none" style={{marginLeft: 'auto'}}>
          <summary className="list-style-none mr-3">
            <img  src={settingsIcon} alt="Settings" height={24} width={24}/>
          </summary>
          <SettingsPage/>
        </details>
      </div>
    )

  }



  getlinkClassname = () => "p-2 mx-2 main-nav-link rounded-1"

  render() {
    return (
      <div className={styles["main-nav-container"]}>
        <div className="d-flex flex-items-center flex-justify-center mb-2 mt-2">
          <img height={64} width={64} src={mainLogo} />
          <span className="f3 ml-2">Ambrosia</span>
        </div>



        <Link to={routes.LIBRARY} activeClassName="active" className={this.getlinkClassname()}>
        <div className="d-flex flex-items-center">
          <img height={24} width={24} src={homeIcon} />
          <span className="ml-2 f4">Library</span>
        </div>
        </Link>


        <Link to={routes.MESSAGES} activeClassName="active" className={this.getlinkClassname()}>
        <div className="d-flex flex-items-center">
          <img height={24} width={24} src={mailIcon} />
          <span className="ml-2 f4">Messages</span>
        </div>
        </Link>
        <Link to={routes.FRIENDS} activeClassName="active" className={this.getlinkClassname()}>
        <div className="d-flex flex-items-center">
          <img height={24} width={24} src={friendsIcon} />
          <span className="ml-2 f4">Friends</span>
        </div>
        </Link>

        <QueryRenderer
          environment={environment}
          query={graphql`
            query MainNavQuery{
              viewer {
                avatar
                username
              }
            }
          `}
          variables={{}}
          render={this.renderProfile}
          />
      </div>
    );
  }
}
