
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import axios from 'axios'


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

  console.log(props)
  const isLoggedIn = props.global.access_token
  return <div>
        { isLoggedIn ? <Redirect push to="/library" /> : ''}
        <input id="username" type="text" name="username"/>
        <input id="password" type="password" name="password"/>
        <button onClick={(e) => login(document.getElementById('username').value, document.getElementById('password').value)}>Login</button>
  </div>;
}
