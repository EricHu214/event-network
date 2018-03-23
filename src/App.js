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

let mockData4 = {
  "ohohoh" : {
    username:"ohohoh",
    description:"Hello there. My name is ohohoh and welcome to my profile!",
    country:"This one",
    goingEvents: {
      1:"Monster Jam!"
    }
  }
}

var currentUser = "ohohoh";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.init();
    queries.loadInitial().then((response) => {this.setState({searchViewData: response._embedded})})
  }

  init = () => {
    return {searchViewData: {events: []}, view: 1};
  }

  logIn = (user, pass, email) => {
    console.log(user)
    this.setState({loggedIn: true})
  }

  logOut = () => {
    this.setState({loggedIn: false})
  }

  interested = (new_id, new_name) => {
    mockData4[currentUser].goingEvents[new_id] = new_name;
    this.setState({});
    console.log("done");
  }

  notInterested = (id) => {
    delete mockData4[currentUser].goingEvents[id];
    this.setState({});
    console.log("deleted");
  }

  switchState = (id, queryData) => {
    if (id === 1) {
      this.setState({view: id});
      if (queryData) queries.searchEventKeyword(queryData).then((response) => {
        this.setState({searchViewData: cleanData(response)})})
    }
    else if (id === 2) {
      this.setState({view: id, detailsViewData: queryData, userProfileData: mockData4[currentUser]});
    }
    else if (id === 3) this.setState({view: id, loginViewData: queryData});
    else if (id === 4) this.setState({view: id, userProfileData: mockData4[currentUser]});
    else if (id === 5) this.setState({view: id});
  }

  render() {
    let view = null;
    if (this.state.view === 1) {
      view = <SearchView switchState={this.switchState} {...this.state.searchViewData}/>;
    }
    else if (this.state.view === 2) {
      view = <DetailsView switchState={this.switchState} {...this.state.searchViewData} {...this.state.detailsViewData} userData={this.state.userProfileData} loggedIn={this.state.loggedIn} interested = {this.interested} notInterested = {this.notInterested}/>;
    }
    else if (this.state.view === 3) {
      view = <LoginView logIn={this.logIn} switchState={this.switchState} {...this.state.loginViewData}/>;
    }
    else if (this.state.view === 4) {
      view = <UserProfileView switchState={this.switchState} {...this.state.userProfileData} searchViewData={this.state.searchViewData}/>;
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
