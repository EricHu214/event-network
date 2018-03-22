import React, { Component } from 'react';
import FormField from '../components/FormField.js'
import '../App.css';

/*
* Construct the advanced search page
*/
class AdvancedSearchView extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    let postalCode = this.refs.postalCode.state.value.split(' ').join('+');
    let city = this.refs.city.state.value.split(' ').join('+');
    let startDate = this.refs.startDate.state.value.split(' ').join('+');
    this.props.switchState(1, "&postalCode=".concat(postalCode,"&city=",city,"&startDate=",startDate));
  }
  render() {
    return (
      <div className="paper detailsBox">
        <div className="header1">Advanced Search</div>
        <div style={{overflow: "hidden"}}>
        <div className="column">
          <div className="userDetailsTextBox">
            <div className="date1">Location</div>
            <FormField ref="postalCode" label="Postal Code" />
            <FormField ref="city" label="City" />
          </div>
        </div>
        <div className="column">
          <div className="userDetailsTextBox">
          <div className="date1">Other</div>
          <FormField label="Type" />
          <FormField ref="startDate" label="Start Date" />
          </div>
        </div>
      </div>
      <div>
        <button onClick={this.handleSubmit} className="generalButton">Submit</button>
      </div>
      </div>
    );
  }
}

export default AdvancedSearchView;
