import React, { Component } from 'react';
import FormField from '../components/FormField.js'
import '../App.css';

/*
* Construct the login page for the user app
*/
class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {register: this.props.register}
  }

  submitRegister = () => {
    let user = this.refs.rUsername.state.value
    let pass = this.refs.rPassword.state.value
    let email = this.refs.rEmail.state.value
    this.props.logIn(user, pass, email);
    this.props.switchState(1);
  }

  submitLogin = () => {
    let user = this.refs.lUsername.state.value
    let pass = this.refs.lPassword.state.value
    this.props.logIn(user, pass);
    this.props.switchState(1);
  }

  render() {
    return (
      <div className="paper loginBox">
        { this.props.register ? (
          <form>
            <div className="header1">Register</div>
            <div className="singleColumn">
            <FormField ref="rEmail" label="Email :"/>
            <FormField ref="rUsername" id="username1" label="Username :"/>
            <FormField ref="rPassword" label="Password :"/>
            <button type="button" className="generalButton" onClick={this.submitRegister}>Submit</button>
            </div>
          </form>
          ) : (
          <form>
            <div className="header1">Login</div>
            <div className="singleColumn">
            <FormField ref="lUsername" id="username2" label="Username :"/>
            <FormField ref="lPassword" label="Password :"/>
            <button type="button" className="generalButton" onClick={this.submitLogin}>Submit</button>
            </div>
          </form>
          )
        }
      </div>
    );
  }
}

export default LoginView;
