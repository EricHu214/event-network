import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'
import '../App.css';

/*
* Construct an event card element for display when you search for a particular
* event
*/
class Error extends Component {
  render() {
    return (
      <div className="errorBox">
        <MaterialIcon icon="error_outline" />
        <div className="errorText">
          {this.props.label}
        </div>
      </div>
    );
  }
}

export default Error;
