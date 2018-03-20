import React, { Component } from 'react';
import '../App.css';

/*
* Construct a form field (input and label) element for use in the app
*/
class FormField extends Component {
  render() {
    return (
      <div>
        <div className="formFieldBox">
          <label className="date1 formFieldLabel"> {this.props.label}
            <input className="formFieldInput" type="text" name={this.props.label} />
          </label>
        </div>
      </div>
    );
  }
}

export default FormField;
