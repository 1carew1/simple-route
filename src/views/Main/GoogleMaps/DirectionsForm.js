import React, { Component, PropTypes as T  } from 'react';
import {Form , FormGroup, ControlLabel , FormControl  ,Button} from 'react-bootstrap';

import GoogleMapsService from '../../../utils/GoogleMapsService';
import FirebaseDatabaseService from '../../../utils/FirebaseDatabaseService';
import AuthService from '../../../utils/AuthService';

const googleMapsService = new GoogleMapsService();

const firebaseDatabaseService = new FirebaseDatabaseService();

class DirectionsForm extends Component {
  constructor(props, context) {
      super(props, context);
      // TODO : Bit messy how This form is given Auth, Home Passes Auth to CustomNavbar which passes the Auth into here
      this.state = {
        profile: props.auth.getProfile(),
        startAddress: '',
        endAddress: ''
      };
      props.auth.on('profile_updated', (newProfile) => {
        this.setState({profile: newProfile})
      });
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  handleStartAddressChange(event){
    this.setState({startAddress: event.target.value});
  }

  handleEndAddressChange(event){
    this.setState({endAddress: event.target.value});
  }

  handleKeyPress(target) {
      // If enter is pressed
      if(target.charCode===13){
              // Prevent the page from reloading
              target.preventDefault();
              this.obtainDirections(); 
      }
  }


  obtainDirections() {
    let obtainDirectionsUsingUsersPreferences = (userData) => {
      googleMapsService.obtainDirectionsWithOptions(this.state.startAddress, this.state.endAddress, this.props.setDirections, userData);
      this.props.closeModal(); 
    }
    const profile = this.state.profile;
    firebaseDatabaseService.readUserDataAndExecuteFunction(profile ,obtainDirectionsUsingUsersPreferences);
  }
  render() {
  	return (
	      <Form onKeyPress={this.handleKeyPress.bind(this)} >
	        <FormGroup controlId="formInlineName">
	          <ControlLabel>Starting Address</ControlLabel>
	          {' '}
	          <FormControl type="text" placeholder="Waterford Institue of Technology" onChange={this.handleStartAddressChange.bind(this)} />
	        </FormGroup>
	        {' '}
	        {' '}
	        <FormGroup controlId="formInlineName">
	          <ControlLabel>End Address</ControlLabel>
	          {' '}
	          <FormControl type="text" placeholder="City Square" onChange={this.handleEndAddressChange.bind(this)} />
	        </FormGroup>
	        {' '}
	        {' '}
	        <Button bsStyle="primary" onClick={this.obtainDirections.bind(this)}>
	          Direct Me
	        </Button>
	      </Form>
  	);
  }
}

export default DirectionsForm;