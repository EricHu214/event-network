import React, { Component } from 'react';
import Pill from '../components/Pill.js'
import '../App.css';

/*
* Construct the user page for the app where information about the user is
* displayed
*/
class UserProfileView extends Component {
  deleteUser = () => {
    var response = window.confirm("Are you sure you want to delete your account?");
    if (response) {
        console.log(this.props.username);
        fetch("http://localhost:5000/users/" + this.props.username, {
          method: 'DELETE',
          credentials: 'include',
          data: JSON.stringify({username:this.props.username.toLowerCase()})
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response.message);
          this.props.logOut();
          this.props.switchState(1);
          window.alert("Your account has been successfully deleted.");
        });
    } else {
      window.alert("You've decided not to delete your account!")
    }
  }

  render() {
    let interestedList = Object.keys(this.props.goingEvents)
    return (
      <div className="paper userDetailsBox">
        <div className="header1">{this.props.username}</div>
        <div className="date1">About me</div>
        <div className="userDetailsTextBox">
        <div>{this.props.description}</div>
        </div>
        <div className="date1">Interested Events</div>
        <div>
          {interestedList.map(x => <Pill handleClick={() =>
            this.props.link_to_event(this.props.goingEvents[x])}
            key={this.props.goingEvents[x]}
            label={this.props.find_name(this.props.goingEvents[x])} />)}
        </div>
        <div>
          <br/>
          {this.props.myProfile &&
            <div className="date1" id="delete-account" onClick={this.deleteUser}>DELETE ACCOUNT</div>
          }
        </div>
      </div>
    );
  }
}

export default UserProfileView;
