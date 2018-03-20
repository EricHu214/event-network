import React, { Component } from 'react';
import './App.css';
import SearchView from './views/SearchView.js'
import DetailsView from './views/DetailsView.js'
import LoginView from './views/LoginView.js'
import UserProfileView from './views/UserProfileView.js'
import SearchBar from './components/SearchBar.js'
import AdvancedSearchView from './views/AdvancedSearchView.js'
// key = 	rgH0sHA67HAtSurrdPQON985G4BAMWTY

let mockData = {
  events: [
  {
    id:1,
    name: "Monster Jam!",
    description: "This is Monster Jam!",
    additionalInfo: "This is a monster jam you can enjoy.",
    images: [{url: "https://static.pexels.com/photos/881608/pexels-photo-881608.jpeg"}],
    priceRanges: [{max: 60, min: 50}],
    dates:{
      start: {
        localDate: "October 31st, 2015",
        localTime: "3:00 PM"
      },
      end: {
        localDate: "October 31st, 2015",
        localTime: "4:00 PM"
      }
    },
    place: {
      country: "Canada",
      city: "Toronto",
      address: "123 sldkfj"
    },
    _embedded: {
      venues: [{address: {line1: 'a'}, city: {name:'samae'}, country: {name: "US"}}]
    }
  },

  {
    id:2,
    name: "Exciting Event",
    description: "A very exciting event",
    additionalInfo: "This is a very exciting event",
    images: [{url: "https://static.pexels.com/photos/881608/pexels-photo-881608.jpeg"}],
    priceRanges: [{max: 60, min: 50}],
    dates: {
      start: {
        localDate: "October 31st, 2015",
        localTime: "3:00 PM"
      },
      end: {
        localDate: "October 31st, 2015",
        localTime: "4:00 PM"
      }
    },
    place: {
      country: "Canada",
      city: "Toronto",
      address: "123 sldkfj"},
    _embedded: {
      venues: [{address: {line1: 'a'}, city: {name:'samae'}, country: {name: "US"}}]
    }
    },

    {
      id:3,
      name: "Exciting Event",
      description: "Some Exciting Event",
      additionalInfo: "This is some exciting event.",
      images: [{url: "https://static.pexels.com/photos/881608/pexels-photo-881608.jpeg"}],
      priceRanges: [{max: 60, min: 50}],
      dates: {
        start: {
          localDate: "October 31st, 2015",
          localTime: "3:00 PM"
        },
        end: {
          localDate: "October 31st, 2015",
          localTime: "4:00 PM"
        }
      },
      place: {
        country: "Canada",
        city: "Toronto",
        address: "123 sldkfj"
      },
      _embedded: {
        venues: [{address: {line1: 'a'}, city: {name:'samae'}, country: {name: "US"}}]
      }
    },
  ]
}

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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.init();
    this.loadData();
  }

  loadData = () => {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?size=3&apikey=rgH0sHA67HAtSurrdPQON985G4BAMWTY',
    {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson._embedded)
      this.setState({searchViewData: responseJson._embedded})
    })
  }

  init = () => {
    return {searchViewData: mockData, view: 1};
  }

  logIn = () => {
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
      this.loadData();
    }
    else if (id === 2) {
      this.setState({view: id, detailsViewData: queryData, userProfileData: mockData4[currentUser]});
      this.loadData();
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
