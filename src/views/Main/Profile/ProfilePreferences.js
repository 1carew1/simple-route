import React, { PropTypes as T } from 'react';
import {Jumbotron} from 'react-bootstrap';

import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import './jumbostyle.css';

import FirebaseDatabaseService from '../../../utils/FirebaseDatabaseService';

const firebaseDatabaseService = new FirebaseDatabaseService();

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

  onTransportPreferenceSelected(transportItem) {
    if(transportItem && transportItem.value) {
          const profile = this.props.profile;
          if(profile) {
            firebaseDatabaseService.updateUserTravelPreference(profile.user_id, transportItem.value);
          }

          this.setState({
            dropDownValue : transportItem.value
          });
    }
  }

  render() {
          //TODO : Replace This with something useful
      firebaseDatabaseService.readUserData(this.props.profile);
    const { profile } = this.props;
    const options = [
        { value: 'BICYCLING', label: 'Cycle' },
        { value: 'DRIVING', label: 'Drive' },
        { value: 'TRANSIT', label: 'Transit' },
        { value: 'WALKING', label: 'Walk' }
    ];

    return (
      <Jumbotron className="centerJumbo">
        
        <h2>Preferences</h2>

        <Select
            style={{width:'20%', marginLeft:'40%', marginRight:'40%'}}
            name="form-field-name"
            value={this.state.dropDownValue}
            options={options}
            onChange={this.onTransportPreferenceSelected.bind(this)}
        />
      </Jumbotron>
    )
  }
}

export default ProfileDetails;