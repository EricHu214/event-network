import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'
import '../App.css';

/*
* Construct an event card element for display when you search for a particular
* event
*/
class EventBox extends Component {
  render() {
    return (
      <div style={{backgroundImage: 'url('+this.props.images[0].url+')'}}
        className={this.props.highlighted ? "eventBox paper2" : "eventBox paper"} onClick={this.props.onClick}>
        <div className="eventTextBox">
          <div className="header1">{this.props.name}</div>
          {this.props.highlighted && <div style={{overflow: "auto", margin: 10}}>
            <MaterialIcon icon="done" />
            <div className="errorText2">
              Interested
            </div>
          </div>}
          <div className="info1">
          {this.props._embedded.venues[0].address ? this.props._embedded.venues[0].address.line1 : ''}, {this.props._embedded.venues[0].city ? this.props._embedded.venues[0].city.name : ''}
          </div>
          <div className="info1">{this.props._embedded.venues[0].country ? this.props._embedded.venues[0].country.name : ''}</div>
          <div className="info1">$ {this.props.priceRanges ? this.props.priceRanges[0].min : 0}</div>
          <div className="date1">{this.props.dates.start.localTime} {this.props.dates.start.localDate}</div>
        </div>
      </div>
    );
  }
}

export default EventBox;
