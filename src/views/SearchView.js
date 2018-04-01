import React, { Component } from 'react';
import '../App.css';
import EventBox from '../components/EventBox.js'
import Error from '../components/Error.js'

/*
* Construct the main page for the user app where the user can search for events
*/
class SearchView extends Component {

  // Define the behaviour that happens when we click on any of the event
  // cards on the search page
  showEvent(id) {
    let obj = this.props.events.find(o => o.id === id);
    this.props.switchState(2, obj);
  }

  render() {
    return (
      <div className="App">
        {this.props.events.length > 0
          ? <div className="eventBoxContainer">
            {this.props.events.map(x =>
              <EventBox highlighted = {this.props.loggedIn && this.props.goingEvents.includes(x.id)}
                onClick={() => this.showEvent(x.id)} key={x.id} {...x}/>)}
          </div>
          : <Error label="Nothing to display here"/>
        }
      </div>
    );
  }
}

export default SearchView;
