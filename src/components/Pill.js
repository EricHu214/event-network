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
      <div className="pillBox">
        <div className="pillText" onClick={this.props.handleClick}>
          {this.props.label}
        </div>
        <MaterialIcon size='tiny' icon="clear" />
      </div>
    );
  }
}

export default Pill;
