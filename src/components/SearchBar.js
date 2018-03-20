import React, { Component } from 'react';
import '../App.css';

/*
* Construct the search bar for use at the top of the application 
*/
class SearchBar extends Component {
  render() {
    return (
      <div className="searchBar">
        <div style={{overflow: "hidden"}}>
          <div className="searchBarSection1">
            <form>
              <label>
                <input placeholder="Search" type="text" className="searchBarInput"/>
              </label>
              <input className="searchButton" type="submit" value="❯" />
            </form>
            <button onClick={() => this.props.switchState(5)} className="searchButton">+</button>
          </div>
          <div className="searchBarSection2">
            {this.props.loggedIn ? (
              <div>
                <button className="generalButton" onClick={() => this.props.switchState(1)}>Home</button>
                <button className="generalButton" onClick={() => this.props.switchState(4)}>My Profile</button>
                <button className="generalButton" onClick={() => { this.props.logOut(); this.props.switchState(1); }}>Sign out</button>
              </div>
              ) : (
              <div>
                <button className="generalButton" onClick={() => this.props.switchState(1)}>Home</button>
                <button className="generalButton" onClick={() => this.props.switchState(3, {register: false})}>Sign in</button>
                <button className="generalButton" onClick={() => this.props.switchState(3, {register: true})}>Register</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
