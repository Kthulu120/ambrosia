/* eslint-disable react/destructuring-assignment */
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



export default class LoginCallback extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      activeForm: 'login'
    }
  }

  login = (username, password) => {
    axios.get('http:127.0.0.1:8000/ambrosia/login',{
      params:{
        username,
        password
      }
    }).then((resp) => {
      this.props.setRefreshTkn(resp.data.access, resp.data.refresh)
    }).catch(function (error) {
      console.log(error);
    });
  }


  renderLoginForm = () => {
    return (
          <Input id="username" type="text" name="username" placeholder="username/email"/>,
          <Input id="password" type="password" name="password" placeholder="password" />,
          <button type="button" className="play-btn px-3 py-2 text-white" onClick={() => this.login(document.getElementById('username').value, document.getElementById('password').value)}>Login</button>,
          <a><p className="mt-2">forgot your password?</p></a>,
          <p>don’t have an account? <a><b>sign up here</b></a></p>
    )
  }

  renderForgotPasswordForm = () => {
    return  [
          <Input id="email" type="text" name="email" placeholder="email address"/>,
          <Input id="username" type="text" name="username" placeholder="username"/>,
          <Input id="password" type="password" name="password" placeholder="password" />,
          <button type="button" className="play-btn px-3 py-2 text-white" onClick={() => this.login(document.getElementById('username').value, document.getElementById('password').value)}>submit</button>,
          <p className="mt-2">forgot your password?</p>,
          <p>Login</p>,
    ]
  }


  renderSignUpForm = () => {
    return[
          <Input id="email" type="text" name="email" placeholder="email address"/>,
          <Input id="username" type="text" name="username" placeholder="username"/>,
          <Input id="password" type="password" name="password" placeholder="password" />,
          <button type="button" className="play-btn px-3 py-2 text-white" onClick={() => this.login(document.getElementById('username').value, document.getElementById('password').value)}>sign up</button>,
          <p className="mt-2">forgot your password?</p>,
          <p>Login</p>,
    ]
  }

  getAuthForm = () => {
    const  { activeForm } = this.state
    switch (activeForm) {
      case 'login':
        return this.renderLoginForm()
      case 'forgot_password':
        return this.renderForgotPasswordForm()
      case 'signup':
        return this.renderSignUpForm()
      default:
        return this.renderLoginForm()
    }
  }

  render(){
    const isLoggedIn = this.props.global.access_token

    return (
      <div className="width-full height-full d-flex flex-items-center flex-justify-center" style={{backgroundColor: '#606888'}}>
        { isLoggedIn ? <Redirect push to="/library" /> : ''}
        <div className="rounded-2 p-3 d-flex flex-column mr-6 flex-justify-center" style={{backgroundColor: '#36393F', maxHeight: 500, maxWidth: 400}}>
          <img src={mainLogo} alt="logo" height={64} width={64} className="flex-self-center mb-2"/>
          {this.renderLoginForm().map(ele => ele)}
        </div>
        <img src={gamePic} alt="gamepad illustration" style={{maxWidth: 400, maxHeight: 343}} />
      </div>)
  }

}
