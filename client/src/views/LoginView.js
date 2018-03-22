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

  // Function to handle submitting user information
  submitForm() {
    this.props.logIn();
    this.props.switchState(1);
  }

  render() {
    return (
      <div className="paper loginBox">
        { this.props.register ? (
          <form>
            <div className="header1">Register</div>
            <div className="singleColumn">
            <FormField label="Email :"/>
            <FormField id="username1" label="Username :"/>
            <FormField label="Password :"/>
            <button type="button" className="generalButton" onClick={() => this.submitForm()}>Submit</button>
            </div>
          </form>
          ) : (
          <form>
            <div className="header1">Login</div>
            <div className="singleColumn">
            <FormField id="username2" label="Username :"/>
            <FormField label="Password :"/>
            <button type="button" className="generalButton" onClick={() => this.submitForm()}>Submit</button>
            </div>
          </form>
          )
        }
      </div>
    );
  }
}

export default LoginView;
