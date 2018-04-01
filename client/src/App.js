import React, { Component } from 'react';
import './App.css';
import * as queries from './api/queries.js'
import SearchView from './views/SearchView.js'
import DetailsView from './views/DetailsView.js'
import LoginView from './views/LoginView.js'
import UserProfileView from './views/UserProfileView.js'
import SearchBar from './components/SearchBar.js'
import AdvancedSearchView from './views/AdvancedSearchView.js'
// key = 	rgH0sHA67HAtSurrdPQON985G4BAMWTY

// Base values for the user profile
let userProfile = {
  username:"",
  description:"",
  country:"",
  goingEvents: []
}

var q = {};

// Add in base values for event information in case the data returned from
// the api has missing values
function cleanData (response) {
  if (response._embedded) {
    const baseEvent = {
      pleaseNote: "No information provided",
      info: "No information provided",
      dates: {start: {localDate: "", localTime: ""}},
      priceRanges: [{min: "None"}],
      _embedded: {venues: [{address: {line1: ""}, city: {name: ""}, country: {name: ""}}]}
    }
    let r = response._embedded
    let newEvents = r.events.map(x => Object.assign({}, baseEvent, x))
    return {events: newEvents}
  }
  return {events: []}
}

// Main controller class for controlling the states of the front end
class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.init();

    // fetch("https://a3server.herokuapp.com/users", {
    fetch("http://localhost:5000/users", {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      var user = response.user;
      if (user) {
        this.logIn(user);
      }
      queries.loadInitial().then((response1) => {q=response1._embedded;this.setState({searchViewData: response1._embedded})})
    })
    .catch(error => console.error('Error:', error));
  }

  init = () => {
    return {searchViewData: {events: []}, view: 1, userProfileData: userProfile};
  }

  // Login function
  logIn = (userInfo) => {
    userProfile.username = userInfo.username
    userProfile.goingEvents = userInfo.events
    userProfile.description = userInfo.description
    this.setState({loggedIn: true})
  }

  // Logout function
  logOut = () => {
    // fetch("https://a3server.herokuapp.com/onlineUsers", {
    fetch("http://localhost:5000/onlineUsers", {
      method: 'PUT',
      credentials: 'include'
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.message)
      this.setState({loggedIn: false})
    });
  }

  // Add events that a user is interested in
  interested = (new_id, new_name) => {
    var data = {eventID: new_id, username: userProfile.username};
    // fetch("https://a3server.herokuapp.com/users/interestedEvents", {
    fetch("http://localhost:5000/users/interestedEvents", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      userProfile.goingEvents.push(new_id);
      this.setState({});
    })
  }

  // Delete events that a user is not interested in
  notInterested = (id) => {
    var data = {eventID: id, username: userProfile.username};
    // fetch("https://a3server.herokuapp.com/users/uninterestedEvents/" = id + "/" + username, {
    fetch("http://localhost:5000/users/uninterestedEvents/" + id + "/" + userProfile.username, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      // Remove the event from the list to refresh the view
      var events = userProfile.goingEvents
      for (var i = 0; i < events.length; i++) {
        if (events[i] === id) {
          userProfile.goingEvents.splice(i, 1);
        }
      }
      this.setState({});
    })
  }

  // Get the event given its id
  link_to_event = (id) => {
    let obj = q.events.find(o => o.id === id);
    this.switchState(2, obj);
  }

  // Get the name of an event given its id
  find_name = (id) => {
    return q.events.find(o => o.id === id).name
  }

  // Visit another user's profile given their data
  visitUserProfile = (userProfile) => {
    this.setState({view: 4, userProfileData: userProfile, myProfile: false});
  }

  // Change views of the program
  switchState = (id, queryData) => {
    if (id === 1) {
      this.setState({view: id});
      if (queryData) queries.searchEventKeyword(queryData).then((response) => {
        this.setState({searchViewData: cleanData(response), userProfileData: userProfile})})
    }
    else if (id === 2) {
      this.setState({view: id, detailsViewData: queryData, userProfileData: userProfile});
    }
    else if (id === 3) this.setState({view: id, loginViewData: queryData});
    else if (id === 4) {
      this.setState({view: id, userProfileData: userProfile, myProfile: true});
    }
    else if (id === 5) this.setState({view: id});
  }

  render() {
    let view = null;
    if (this.state.view === 1) {
      view = <SearchView switchState={this.switchState}
        loggedIn={this.state.loggedIn} {...this.state.userProfileData}
        {...this.state.searchViewData}/>;
    }
    else if (this.state.view === 2) {
      view = <DetailsView switchState={this.switchState}
      {...this.state.searchViewData}{...this.state.detailsViewData}
      userData={this.state.userProfileData} loggedIn={this.state.loggedIn}
      interested = {this.interested} notInterested = {this.notInterested}
      visitUserProfile={this.visitUserProfile}/>;
    }
    else if (this.state.view === 3) {
      view = <LoginView logIn={this.logIn} switchState={this.switchState}
      {...this.state.loginViewData}/>;
    }
    else if (this.state.view === 4) {
      view = <UserProfileView find_name = {this.find_name}
      link_to_event = {this.link_to_event} switchState={this.switchState}
      {...this.state.userProfileData}
      myProfile={this.state.myProfile}
      logOut={this.logOut}
      searchViewData={this.state.searchViewData}/>;
    }
    else if (this.state.view === 5) {
      view = <AdvancedSearchView switchState={this.switchState} />
    }
    else {
      view = null;
    }
    return (
      <div className="App">
        <SearchBar loggedIn={this.state.loggedIn} logOut={this.logOut} switchState={this.switchState}/>
        {view}
      </div>
    );
  }
}

export default App;
