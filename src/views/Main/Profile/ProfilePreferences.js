import React, { PropTypes as T } from 'react';
import {Jumbotron} from 'react-bootstrap';

import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import './jumbostyle.css';

export class ProfileDetails extends React.Component {
  constructor() {
      super();
      this.state = {
        dropDownValue : 'One'
      };
  }

  static propTypes = {
    profile: T.object,
  }

  onDropdownSelected(dropDownObject) {
    if(dropDownObject && dropDownObject.value) {
          console.log('Value Selected : ' + dropDownObject.value);
          this.setState({
            dropDownValue : dropDownObject.value
          });
    }
  }

  render() {
    const { profile } = this.props;
    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ];

    return (
      <Jumbotron className="centerJumbo">
          <h2>Preferences</h2>

        <Select
            style={{width:'40%', marginLeft:'30%', marginRight:'30%'}}
            name="form-field-name"
            value={this.state.dropDownValue}
            options={options}
            onChange={this.onDropdownSelected.bind(this)}
        />
      </Jumbotron>
    )
  }
}

export default ProfileDetails;