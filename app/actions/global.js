// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SET_ACESS_TOKEN = 'SET_ACESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const LOAD_GLOBAL_ALL= 'SET_GLOBAL_ALL';


export function setAcsTkn(access_token: string) {
  return {
    type: SET_ACESS_TOKEN,
    access_token
  };
}

export function setRefreshTkn(access_token: string, refresh_token: string) {
  return {
    type: SET_REFRESH_TOKEN,
    access_token,
    refresh_token
  };
}

export function setGlobal(){
  return {
    type: LOAD_GLOBAL_ALL,
  }
}

