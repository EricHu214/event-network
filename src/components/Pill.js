import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'
import '../App.css';

/*
* Construct an event card element for display when you search for a particular
* event
*/
class Pill extends Component {
  render() {
    return (
      <div className="pillBox" onClick={this.props.handleClick}>
        <div className="pillText">
          {this.props.label}
        </div>
      </div>
    );
  }
}

export default Pill;
