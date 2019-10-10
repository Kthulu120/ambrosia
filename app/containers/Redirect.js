/* eslint-disable promise/always-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import gamePic from './../assets/img/undraw_gaming_6oy3.png'
import mainLogo from "../assets/logo/Ambrosia_64.png"
import Input from './../components/Input/Input'
//    <Redirect push to="/somewhere/else" />



export function LoginCallback(props) {

  function login(username, password){
    axios.get('http:127.0.0.1:8000/ambrosia/login',{
      params:{
        username,
        password
      }
    }).then((resp) => {
      props.setRefreshTkn(resp.data.access, resp.data.refresh)
    }).catch(function (error) {
      console.log(error);
    });
  }

  const isLoggedIn = props.global.access_token
  return <div className="width-full height-full d-flex flex-items-center flex-justify-center" style={{backgroundColor: '#606888'}}>
        { isLoggedIn ? <Redirect push to="/library" /> : ''}
        <div className="rounded-2 p-3 d-flex flex-column mr-6 flex-justify-center" style={{backgroundColor: '#36393F', maxHeight: 500, maxWidth: 400}}>
          <img src={mainLogo} height={64} width={64} className="flex-self-center mb-2"/>
          <Input className="my-1" id="username" type="text" name="username" placeholder="username/email"/>
          <Input className="my-1" id="password" type="password" name="password" placeholder="password" />
          <button className="my-1" type="button" className="play-btn px-3 py-2 text-white" onClick={(e) => login(document.getElementById('username').value, document.getElementById('password').value)}>Login</button>
          <p className="mt-2">forgot your password?</p>
          <p>don’t have an account? <b>sign up here</b></p>
        </div>
        <img src={gamePic} style={{maxWidth: 400, maxHeight: 343}} />
  </div>;
}
