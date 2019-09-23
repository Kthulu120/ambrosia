// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'bluebird';
import routes from '../../constants/routes';
import GameCover from "../GameCover/GameCover"
import type {CoverStyle} from "../GameCover/GameCover"

import {launchers} from './../../internals/Core/Launchers'
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import store from './../../index'
import GameModel from "./../../internals/Models/Game"
import axios from 'axios'
import AmbrosiaApp from '../../internals/AmbrosiaApp';
import Table from 'rc-table';

// Assets
import plus_circle from "../../assets/img/minus_circle.png"
import homeIcon from "../../assets/icons/home icon.png"
import list_view from "../../assets/icons/list_view.svg"
import list_view_active from "../../assets/icons/list_view_active.svg"
import square_view from "../../assets/icons/square_view.svg"
import square_view_active from "../../assets/icons/square_view_active.svg"
import big_view from "../../assets/icons/big_view.svg"
import big_view_active from "../../assets/icons/big_view_active.svg"
// Launcher Icons
import dolphinIcon from './../../assets/icons/dolphinlogo_64.png'
import pcsx2Icon from './../../assets/icons/pcsx2.png'
import rpcs3Icon from './../../assets/icons/rpcs3.png'
import pcGamingIcon from './../../assets/icons/pc_icon.png'

type Props = {
  installed_games: Array<Object>,
  setInstalledGamesRedux: Function,
  gameTitles: [],
  isLoading: Boolean,
  filterGameListOptions: Array
};


const CustomOption = ({ innerProps, isDisabled }) =>
  !isDisabled ? (
    <div {...innerProps}>{/* your component internals */}</div>
  ) : null;


export default class LibraryHomePage extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {
      coverStyle: "Big",
      filterGameListOptions: props.installed_games
    }
  }

  // on mount load installed games and set filtered game state
  componentDidMount(){
    this.props.setInstalledGamesRedux()
    //this.setState({ filterGameListOptions: this.props.installed_games})
  }

  handleGameExecutable = (event: Event) => {
    this.setState({path_name: event.target.value})
  }

  handleLauncher = (event: Event) => {
    this.setState({launcher: event.target.value})
  }

  handleGameTitle = (event: Event) => {
    this.searchGameFromTitle(event.target.value)
  }

  searchGameFromTitle = (title, callback) => {
    this.setState({isLoading: true})
    axios.get(`http://127.0.0.1:8000/graphql`, {
      params: {
        query: `{
          gameSearch(title:"${title}", year:"", platformName:"") {
            id
            name
            description
            platforms {
              edges {
                node {
                  name
                }
              }
            }
          }
        }`,
        year: '',
      }
    }).then(response => {
      const games = response.data.data.gameSearch
      // fold duplicate games by GraphQL ID and set gameTitles
      const allGames = {}
      const optionSelectArr = []
      games.forEach((ele) => {
        if(!allGames[ele.id]){
          allGames[ele.id] = ele
          optionSelectArr.push({label: ele.name, value: ele.id})
        }
      })
      callback(optionSelectArr)
      this.setState({gameTitles: Object.values(allGames), isLoading: false})
    }).catch(function (error) {
    console.error(error);
    })
  }

  getGameLauncherIcon = (launcher_name) => {
    switch(launcher_name){
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

  handleGameFilterList = (event) => {
    this.setState({filterGameListOptions: this.props.installed_games.filter(ele => ele.get('title') && ele.get('title').includes(event.target.value))})
  }

  handleAddGame = () => {
    //const doesExist = this.props.installed_games.some(ele => fullPath === ele)
    this.props.addVideoGame(this.state.path_name, this.state.launcher)
  }

  getViewIcons = () => {
    const icons = []
    switch (this.state.coverStyle) {
      case "List":
        icons.push(<img onClick={() => this.setState({coverStyle: 'List'})} className="mx-1" src={list_view_active} key="list_active" height={24}></img>)
        icons.push(<img onClick={() => this.setState({coverStyle: 'Square'})} className="mx-1" src={square_view} key="square" height={24}></img>)
        icons.push(<img onClick={() => this.setState({coverStyle: 'Big'})} className="mx-1" src={big_view} key="big" height={24}></img>)
        return icons
      case "Square":
          icons.push(<img onClick={() => this.setState({coverStyle: 'List'})} className="mx-1" src={list_view}  key="list" height={24}></img>)
          icons.push(<img onClick={() => this.setState({coverStyle: 'Square'})} className="mx-1" src={square_view_active} key="square_active" height={24}></img>)
          icons.push(<img onClick={() => this.setState({coverStyle: 'Big'})} className="mx-1" src={big_view} key="big" height={24}></img>)
          return icons
      case "Big":
          icons.push(<img onClick={() => this.setState({coverStyle: 'List'})} className="mx-1" src={list_view} key="list" height={24}></img>)
          icons.push(<img onClick={() => this.setState({coverStyle: 'Square'})} className="mx-1" src={square_view} key="square" height={24}></img>)
          icons.push(<img onClick={() => this.setState({coverStyle: 'Big'})} className="mx-1" src={big_view_active} key="big_active" height={24}></img>)
          return icons
    }
  }

  getListViewColumns = () => {
    return [{title: 'Title', key: 'title', dataIndex: 'title', mwidth: 400, className: "py-2  game-title", render: (val) => <span className="ml-2" style={{fontSize: 18}}>{val}</span>},
    {title: 'Launcher', key: 'launcher_name', dataIndex: 'launcher_name', className: 'text-center mr-3', mwidth: 150, render: (val) => <img height={20} src={this.getGameLauncherIcon(val)}/>},
    { title: '', dataIndex: '', key: 'f', className: 'text-center', width: 100, render: (o, row) => <div onClick={() => row.launch()} className="d-flex "><div className="px-4 py-1 play-btn ">Play</div></div>}]
  }



  render() {



    return (
      <div className="height-full d-flex flex-column width-full">
        <div className="width-full main-header d-flex flex-items-center pl-4">
          <img src={homeIcon} height={32}></img>
          <span className="f3 ml-2">Library</span>
          <div style={{marginLeft: 'auto'}} className="mr-4">
            {this.getViewIcons()}
          </div>
        </div>

        <div className="height-full width-full d-flex flex-wrap flex-column pl-2 pt-2">
        { this.state.coverStyle === "List" ?
        <div className="width-full d-flex">
          <Table tableClassName={"width-full"} tableLayout={'auto'} className={"width-full"} id="game-library-table" rowClassName={'p-3'} prefixCls={'game-table width-full'} columns={this.getListViewColumns()} data={this.props.installed_games} />
        </div> : <ul className="height-full width-full d-flex flex-column flex-wrap">
        {
          this.props.installed_games.map((game) => <GameCover coverStyle={this.state.coverStyle} game={game} key={game.title} title={game.title}/>)
        }
      </ul>}

        </div>
      </div>
    );
  }
}
