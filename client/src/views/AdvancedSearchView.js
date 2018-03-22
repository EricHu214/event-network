import React, { Component } from 'react';
import FormField from '../components/FormField.js'
import '../App.css';

/*
* Construct the advanced search page 
*/
class AdvancedSearchView extends Component {
  render() {
    return (
      <div className="paper detailsBox">
        <div className="header1">Advanced Search</div>
        <div style={{overflow: "hidden"}}>
        <div className="column">
          <div className="userDetailsTextBox">
            <div className="date1">Location</div>
            <FormField label="Postal Code" />
            <FormField label="City" />
          </div>
        </div>
        <div className="column">
          <div className="userDetailsTextBox">
          <div className="date1">Other</div>
          <FormField label="Type" />
          <FormField label="Start Date" />
          </div>
        </div>
      </div>
      <div>
        <button className="generalButton">Submit</button>
      </div>
      </div>
    );
  }
}

export default AdvancedSearchView;
