import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import GoogleMapsService from '../../../utils/GoogleMapsService';

const googleMapsService = new GoogleMapsService();

class DirectionsForm extends Component {


  obtainDirections() {
  	const startAddress = ReactDOM.findDOMNode(this.refs.startingAddress).value;
  	const endAddress = ReactDOM.findDOMNode(this.refs.endAddress).value;
  	googleMapsService.obtainDirections(startAddress,endAddress);
  }
  render() {
  	return (
  			<div>
	  			<form> 
				  <div className="form-group">
				    <label htmlFor="startingAddress">Starting Address</label>
				    <input type="text" className="form-control" id="startingAddress" ref="startingAddress" aria-describedby="startingAddress" placeholder="Enter Starting Address" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="endAddress">End Address</label>
				    <input type="text" className="form-control" id="endAddress" ref="endAddress" aria-describedby="endAddress" placeholder="Enter End Address" />
				  </div>
				</form>
  				<Button className="btn btn-primary" onClick={this.obtainDirections.bind(this)}>Direct me!</Button>
			</div>
  	);
  }
}

export default DirectionsForm;