import React, { Component } from 'react';
import '../App.css';

/*
* Construct a form field (input and label) element for use in the app
*/
class FormFieldSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
  }

  updateInputValue = (evt) => {
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    return (
      <div className="formFieldSelectBox">
        <label className="date1 formFieldLabel">
          {this.props.label}
        </label>
        <textarea id={this.props.id}
          onChange={evt => this.updateInputValue(evt)}
          className="formFieldSelectInput" />
      </div>
    );
  }
}

export default FormFieldSelect;
