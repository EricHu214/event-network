import React, { Component } from 'react';
import Pill from '../components/Pill';
import '../App.css';

/*
* Construct the details page for the user app
*/
class DetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestedUsers: []
    };
    this.getAllEvents()
  }

  getAllEvents() {
    fetch('/goingEvents/'+this.props.id, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(response => {this.setState({interestedUsers: response.goingUsers.interestedUsers}); console.log(response)})
    .catch(error => console.error('Error:', error))
  }

  render() {
    let div = null;
    if(this.props.loggedIn) {
      if (this.props.userData.goingEvents.includes(this.props.id)) {
        div =
        <div>
          <button className="interest_button" onClick={() =>
            this.props.notInterested(this.props.id)}>
            not interested
          </button>
        </div>;
      }
      else {
        div =
        <div>
          <button className="interest_button" onClick={() =>
            this.props.interested(this.props.id, this.props.name)}>
            I am interested
          </button>
        </div>;
      }
    }
    return (
      <div className="detailsBoxContainer">
        <div className="detailsBox">
          <img className="displayImage" src={this.props.images[0].url} />
          <div className="paper detailsTextBox">
            <div className="header1">{this.props.name}</div>
            <div className="header2">{this.props.dates.start.localTime}, {this.props.dates.start.localDate}</div>
            <div className="header2">ABOUT</div>
            <div>{this.props._embedded.venues[0].name}</div>
            <div>{this.props._embedded.venues[0].address ? this.props._embedded.venues[0].address.line1 : "None"}</div>
            <div>${this.props.priceRanges[0].min} - ${this.props.priceRanges[0].max}</div>
            <div className="header2">INFO</div>
            <div>{this.props.info}</div>
            <div className="generalButton"><a href={this.props.url}>BUY TICKETS</a></div>
            {div}
          </div>
          <div className="paper detailsTextBox2">
            <div className="header1">INTERESTED USERS</div>
            {this.state.interestedUsers &&
              this.state.interestedUsers.map(o => <Pill label={o.username} handleClick={() => this.props.visitUserProfile(o)} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsView;
