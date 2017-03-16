import React, { PropTypes as T } from 'react';
import {Jumbotron, ControlLabel, Checkbox} from 'react-bootstrap';

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
        travelModeOption : 'Drive',
        unit : 'Metric',
        avoidTolls : false,
        avoidMotorWay : false
      };
  }

  static propTypes = {
    profile: T.object,
  }

  onTransportPreferenceSelected(transportItem) {
    if(transportItem && transportItem.value) {
          const profile = this.props.profile;
          if(profile) {
            firebaseDatabaseService.updateUserTravelMode(profile.user_id, transportItem.value);
          }

          this.setState({
            travelModeOption : transportItem.label
          });
    }
  }


  onUnitsSelected(unitsItem) {
    if(unitsItem && unitsItem.value) {
          const profile = this.props.profile;
          if(profile) {
            firebaseDatabaseService.updateUserUnits(profile.user_id, unitsItem.value);
          }

          this.setState({
            unit : unitsItem.label
          });
    }
  }

  onAvoidTollsClicked(event) {
    const profile = this.props.profile;
    const avoidTolls = this.state.avoidTolls;
    this.setState({avoidTolls : !avoidTolls});
    firebaseDatabaseService.updateUserAvoidTolls(profile.user_id, !avoidTolls);
  }

  onAvoidMotorwayClicked(event) {
    const profile = this.props.profile;
    const avoidMotorways = this.state.avoidMotorWay;
    this.setState({avoidMotorWay : !avoidMotorways});
    firebaseDatabaseService.updateUserAvoidMotorway(profile.user_id, !avoidMotorways);
  }

  render() {
    firebaseDatabaseService.readUserData(this.props.profile);
    const { profile } = this.props;
    const travelModeOptions = [
        { value: 'BICYCLING', label: 'Cycle' },
        { value: 'DRIVING', label: 'Drive' },
        { value: 'TRANSIT', label: 'Transit' },
        { value: 'WALKING', label: 'Walk' }
    ];
    const unitOptions = [
        { value: 'IMPERIAL', label: 'Imperial' },
        { value: 'METRIC', label: 'Metric' }
    ];
    //TODO : Fix Travel Mode Not Displating Initially

    return (
      <Jumbotron className="centerJumbo">
        <h2>Preferences</h2>
        <Checkbox checked={this.state.avoidMotorWay} onClick={this.onAvoidMotorwayClicked.bind(this)}>Avoid Motorways/HighWays</Checkbox>
        <Checkbox checked={this.state.avoidTolls} onClick={this.onAvoidTollsClicked.bind(this)}>Avoid Tolls</Checkbox>

        <div style={{width:'20%', marginLeft:'40%', marginRight:'40%'}}>
          <ControlLabel>Travel Mode : {this.state.travelModeOption}</ControlLabel>
          <Select
              name="travel_mode_select"
              value={this.state.travelModeOption}
              options={travelModeOptions}
              onChange={this.onTransportPreferenceSelected.bind(this)}
          />
        </div>
        <br />

        <div style={{width:'20%', marginLeft:'40%', marginRight:'40%'}}>
          <ControlLabel>Units : {this.state.unit}</ControlLabel>
          <Select
              name="unit_select"
              value={this.state.unit}
              options={unitOptions}
              onChange={this.onUnitsSelected.bind(this)}
          />
        </div>
      </Jumbotron>
    )
  }
}

export default ProfileDetails;