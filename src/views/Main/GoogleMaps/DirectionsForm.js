import React, { Component } from 'react';
import {Form , FormGroup, ControlLabel , FormControl  ,Button} from 'react-bootstrap';

import GoogleMapsService from '../../../utils/GoogleMapsService';

const googleMapsService = new GoogleMapsService();

class DirectionsForm extends Component {
  constructor() {
    super();
    this.state = { startAddress: '', endAddress: '' };
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
  	googleMapsService.obtainDirections(this.state.startAddress, this.state.endAddress);
  	this.props.closeModal(); 
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
	          Go
	        </Button>
	      </Form>
  	);
  }
}

export default DirectionsForm;