import React, { Component } from 'react';
import '../App.css';
import MaterialIcon from 'material-icons-react'

/*
* Construct the search bar for use at the top of the application
*/
class SearchBar extends Component {
  handleSubmit = (e, text) => {
    e.preventDefault()
    let parsedKeywords = this.refs.keywords.value.split(' ').join('+')
    this.props.switchState(1, "&keyword="+parsedKeywords)
  }
  
  render() {
    return (
      <div className="searchBar">
        <div style={{overflow: "hidden"}}>
          <div className="searchBarSection1">
            <form onSubmit={this.handleSubmit}>
              <label>
                <input ref="keywords" placeholder="Search" type="text" className="searchBarInput"/>
              </label>
              <button style={{paddingTop: 5}} className="searchButton" type="submit" onClick={this.handleSubmit} value="❯">
                <MaterialIcon color='#878787' icon="chevron_right" size='tiny'/>
              </button>
            </form>
            <button style={{paddingTop: 5, paddingLeft: 5}} onClick={() => this.props.switchState(5)} className="searchButton">
              <MaterialIcon color='#878787' icon="playlist_add" size='tiny' />
            </button>
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
