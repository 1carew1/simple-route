import React, { Component } from 'react';
import {Form , FormGroup, ControlLabel , FormControl  ,Button} from 'react-bootstrap';


class FlyToLocationForm extends Component {

  constructor() {
    super();
    this.state = { address: '' };
  }

  handleKeyPress(target) {
      // If enter is pressed
      if(target.charCode==13){
              // Prevent the page from reloading
              target.preventDefault();
              this.goToLocation(); 
      }

  }

  handleChange(event){
    this.setState({address: event.target.value});
  }

  goToLocation(){
    console.log('Going to location : ' + this.state.address);
  }

  render() {
  	return (
      <Form onKeyPress={this.handleKeyPress.bind(this)}>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Location</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Waterford Institue of Technology" onChange={this.handleChange.bind(this)} />
        </FormGroup>
        {' '}
        {' '}
        <Button bsStyle="primary" onClick={this.goToLocation.bind(this)}>
          Go
        </Button>
      </Form>
  	);
  }
}

export default FlyToLocationForm;