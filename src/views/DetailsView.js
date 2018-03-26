import React, { Component } from 'react';
import '../App.css';

/*
* Construct the details page for the user app
*/
class DetailsView extends Component {

  render() {
    let div = null;
    if(this.props.loggedIn) {
      if (this.props.id in this.props.userData.goingEvents) {
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
        <div className="paper detailsBox" style={{backgroundImage: 'url('+this.props.images[0].url+')'}}>
          <div className="detailsTextBox">
            <div className="header1">{this.props.name}</div>
            <div className="header2">{this.props.dates.start.localTime}, {this.props.dates.start.localDate}</div>
            <div className="header2">ABOUT</div>
            <div>{this.props._embedded.venues[0].name}</div>
            <div>{this.props._embedded.venues[0].address ? this.props._embedded.venues[0].address.line1 : "None"}</div>
            <div>${this.props.priceRanges[0].min} - ${this.props.priceRanges[0].max}</div>
            <div className="header2">INFO</div>
            <div>{this.props.info}</div>
            <div></div>
            <div className="date1"><a href={this.props.url}>Buy tickets now</a></div>
            {div}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsView;
