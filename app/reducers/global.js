/* eslint-disable no-fallthrough */
// @flow
import { SET_ACESS_TOKEN, SET_REFRESH_TOKEN, LOAD_GLOBAL_ALL, SET_USER_GQL_ID } from '../actions/global';
import type { Action } from './types';



const {access_token} = JSON.parse(localStorage.getItem("settings"))


const stateobj = {
  access_token: access_token ? access_token : "",
  refresh_token: "",
  last_access_tkn_time: "",
  last_tkn_refresh_time: "",
  activeLogin: false,
  graphQLId: ''
}

export default function library(state: Object = stateobj, action: Action) {
  let newState;
  switch (action.type) {
    case SET_USER_GQL_ID:
      newState = Object.assign({}, state, {
        graphQLId: action.newId,
      })
      return newState
    case SET_ACESS_TOKEN:
      newState = Object.assign({}, state, {
        access_token: action.access_token,
        last_access_tkn_time :new Date().getTime().toString(),
        activeLogin: true,
      })
      localStorage.setItem("settings", JSON.stringify(newState))
      return newState
    case SET_REFRESH_TOKEN:
        const time = new Date().getTime().toString()
        newState = Object.assign({}, state, {
          access_token: action.access_token,
          refresh_token: action.refresh_token,
          last_access_tkn_time: time,
          last_tkn_refresh_time: time,
          activeLogin: true,
        })
        localStorage.setItem("settings", JSON.stringify(newState))
        return newState
    case LOAD_GLOBAL_ALL:
        return JSON.parse(localStorage.getItem("settings"))
    default:
      return state;
  }
}
