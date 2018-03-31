import React, { Component } from 'react';
import FormField from '../components/FormField.js'
import FormFieldSelect from '../components/FormFieldSelect.js'
import Error from '../components/Error.js'
import '../App.css';

/*
* Construct the login page for the user app
*/
class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {register: this.props.register, error: ""};
  }

  componentWillReceiveProps(props) {
    this.setState({error: ""});
  }

  submitRegister = () => {
    let username = this.refs.rUsername.state.value
    let password = this.refs.rPassword.state.value
    let password2 = this.refs.rConfirmPassword.state.value
    let email = this.refs.rEmail.state.value
    let description = this.refs.rDescription.state.value

    var data = {username, password, email, description}
    console.log(data);

    fetch("/signup", {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body:JSON.stringify(data),
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.success);
      if (response.success) {
        console.log(response.message);
        this.setState({error: ""});
        this.props.logIn(response.success);
        this.props.switchState(1);
      }
      else {
        console.log(response.message);
        this.setState({error: response.message});
      }});
  }

  submitLogin = () => {
    let username = this.refs.lUsername.state.value;
    let password = this.refs.lPassword.state.value;

    var data = {username, password}
    console.log(data);

    fetch("/login", {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body:JSON.stringify(data),
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.success);
      if (response.success) {
        this.setState({error: ""});
        this.props.logIn(response.success);
        console.log(response.success)
        this.props.switchState(1);
      }
      else {
        console.log(response.message);
        this.setState({error: response.message});
      }});
  }

  render() {
    return (
      <div className="paper loginBox">
        { this.props.register ? (
          <form>
            <div className="header1">Register</div>
            <div className="singleColumn">
            <FormField ref="rEmail" id="email" label="Email :"/>
            <FormField ref="rUsername" id="username1" label="Username :"/>
            <FormFieldSelect ref="rDescription" label="About me :"/>
            <FormField ref="rPassword" password label="Password :"/>
            <FormField ref="rConfirmPassword" password label="Confirm Password :"/>
            <button type="button" className="generalButton" onClick={this.submitRegister}>Submit</button>
            </div>
            {this.state.error.length > 1 &&
              <Error label={this.state.error} />
            }
          </form>
          ) : (
          <div>
            <div className="header1">Login</div>
            <div className="singleColumn">
            <FormField ref="lUsername" id="username2" label="Username :"/>
            <FormField ref="lPassword" password id="password2" label="Password :"/>
            <button type="button" className="generalButton" onClick={this.submitLogin}>Submit</button>
            </div>
            {this.state.error.length > 1 &&
              <Error label={this.state.error} />
            }
          </div>
          )
        }
      </div>
    );
  }
}

export default LoginView;
