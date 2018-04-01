import React, { Component } from 'react';
import '../App.css';

/*
* Create a pill item to display information items like usernames or event
* names
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
