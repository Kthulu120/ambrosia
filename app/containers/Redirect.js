
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import axios from 'axios'


//    <Redirect push to="/somewhere/else" />
function login(username, password){
  axios.get('http:127.0.0.1:8000/ambrosia/login',{
    params:{
      username,
    password
    }
  }).then((resp) => props.setJWTTokens()).catch(function (error) {
    console.log(error);
  });
}


export function LoginCallback(props) {
  console.log(props)
  return <div>
        <input id="username" type="text" name="username"/>
        <input id="password" type="password" name="password"/>
        <button onClick={(e) => login(document.getElementById('username').value, document.getElementById('password').value)}></button>
  </div>;
}
