import React, { Component } from 'react';
import FormField from '../components/FormField.js'
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
    let email = this.refs.rEmail.state.value

    var data = {username, password, email}
    console.log(data);

    var result = fetch("http://localhost:5000/signup", {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body:JSON.stringify(data)

    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.success);
      if (response.success) {
        console.log(response.message);
        this.setState({error: ""});
        this.props.logIn(username, password, email, response.success);
        this.props.switchState(1);
      }
      else {
        console.log(response.message);
        this.setState({error: response.message});
      }});





    // Promise.resolve(result)
    // .then(returnValue => {
    //   console.log("hi");
    //   this.setState({error: ""});
    //   this.props.logIn(username, password, email);
    //   this.props.switchState(1);
    // })
    // .catch(err => {
    //   this.setState({error: err});
    // })
  }

  submitLogin = () => {
    let username = this.refs.lUsername.state.value;
    let password = this.refs.lPassword.state.value;

    var data = {username, password}
    console.log(data);

    var result = fetch("http://localhost:5000/login", {
      method: 'POST',
      headers: {
      'content-type': 'application/json'
      },
      body:JSON.stringify(data)

    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.success);
      if (response.success) {
        console.log(response.message);
        this.setState({error: ""});
        this.props.logIn(username, password, "", response.success);
        this.props.switchState(1);
      }
      else {
        console.log(response.message);
        this.setState({error: response.message});
      }});
    // this.props.logIn(user, pass);
    // this.props.switchState(1);
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
            <FormField ref="rPassword" label="Password :"/>
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
            <FormField ref="lPassword" id="password2" label="Password :"/>
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
