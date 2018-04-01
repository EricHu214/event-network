import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'
import '../App.css';

/*
* Construct a warning for when the user gives unexpected input or there are
* no events to display etc.
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
