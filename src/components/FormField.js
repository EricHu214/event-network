import React, { Component } from 'react';
import '../App.css';

/*
* Construct a form field (input and label) element for use in the app
*/
class FormField extends Component {
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
      <div>
        <div className="formFieldBox">
          <label className="date1 formFieldLabel"> {this.props.label}
            {this.props.choices
              ? <select onChange={evt => this.updateInputValue(evt)}>
                  <option key="Any" value="">Any</option>
                  {this.props.choices.map((x) => (<option key={x} value={x}>{x}</option>))}
                </select>
              : <input onChange={evt => this.updateInputValue(evt)} className="formFieldInput" type="text" name={this.props.label} />}
          </label>
        </div>
      </div>
    );
  }
}

export default FormField;
