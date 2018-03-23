import React, { Component } from 'react';
import FormField from '../components/FormField.js'
import '../App.css';

function addParam(identifier, value) {
  if (value) return "&"+identifier+"="+value;
  return "";
}

/*
* Construct the advanced search page
*/
class AdvancedSearchView extends Component {
  validate(startDate) {
    let validDate = startDate === "" || /^\d{4}-\d{2}-\d{2}$/.test(startDate);
    return validDate;
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let country = this.refs.country.state.value.split(' ').join('+');
    let city = this.refs.city.state.value.split(' ').join('+');
    let startDate = this.refs.startDate.state.value.split(' ').join('+');
    let type = this.refs.type.state.value
    if (this.validate(startDate)) {
      let baseString = "";
      baseString = baseString.concat(addParam("country", country),
      addParam("city", city), addParam("startDate", startDate),
      addParam("classificationName", type));
      this.props.switchState(1,baseString);
    } else {
      //handle error
    }
  }
  render() {
    return (
      <div className="paper detailsBox">
        <div className="header1">Advanced Search</div>
        <div style={{overflow: "hidden"}}>
        <div className="column">
          <div className="userDetailsTextBox">
            <div className="date1">Location</div>
            <FormField ref="country" label="Country" />
            <FormField ref="city" label="City" />
          </div>
        </div>
        <div className="column">
          <div className="userDetailsTextBox">
          <div className="date1">Other</div>
          <FormField ref="type" choices={["Arts", "Family", "Music", "Sports", "Theater"]} label="Type" />
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
