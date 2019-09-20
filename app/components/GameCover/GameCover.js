// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameCover.css'
import { GameModel } from '../../internals/Models/Game';
import dolphinIcon from './../../assets/icons/dolphinlogo_64.png'
import pcsx2Icon from './../../assets/icons/pcsx2.png'
import rpcs3Icon from './../../assets/icons/rpcs3.png'
import pcGamingIcon from './../../assets/icons/pc_icon.png'


export type CoverStyle = "Square" | "Big" | "List"

type Props = {
   game: GameModel,
   coverStyle: "Square" | "Big" | "List"
};
//file:///C:/Users/Colon/Downloads/Ambrosia/Idea%20Imaes/f3b84678966289.5cc0a75c9a798.png




export default class GameCover extends Component<Props> {
  props: Props;


  getLauncherIcon = () => {
    switch (this.props.game.get('launcher_name')) {
      case "PC":
        return pcGamingIcon
      case "PCSX2":
        return pcsx2Icon
      case "RPCS3":
        return rpcs3Icon
      case "Dolphin":
        return dolphinIcon
      default:
        pcGamingIcon;
    }
  }

  renderBigCoverComponent = () => (
    <div onClick={(event) => this.props.game.launch()} className={styles.gameCover}>
      <img alt={this.props.game.title} className="rounded-1" style={{width: 125, height: 200}} title={this.props.game.get('title')} src={`file:///${this.props.game.get('cover_img')}`} />
      <div className="d-flex">
        <span>{this.props.game.get('title')}</span> <span><img className="mt-1" style={{marginLeft: 'auto'}} src={this.getLauncherIcon()} height={20}></img></span>
      </div>
    </div>
  )

  renderListComponent = () => (
    <li className="d-flex flex-auto min-width-0">
      <span className="mx-2" style={{minWidth: 400, fontSize: 18}}> {this.props.game.get('title')} </span>
      <img className="px-4 flex-self-center" src={this.getLauncherIcon()} height={20}/>
      <div onClick={() => this.props.game.launch()} className="rounded-1 px-3 py-1 ml-4 flex-self-center" style={{backgroundColor: '#606888', cursor: 'pointer'}}>Play</div>
    </li>
  )



  renderCoverStyle = () => {
    switch (this.props.coverStyle){
      case "Big":
        return this.renderBigCoverComponent()
      case "Square":
          return this.renderBigCoverComponent()
      case "List":
          return this.renderListComponent()
      default:
        return this.renderBigCoverComponent()
    }
  }

  render() {
    const cover_img = this.props.game.get('cover_img') || 'http://via.placeholder.com/250'
    return (
      <div>
        {this.renderCoverStyle()}
      </div>
    );
  }
}
