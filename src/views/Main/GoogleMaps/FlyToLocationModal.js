import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import FlyToLocationForm from './FlyToLocationForm';


class FlyToLocationModal extends Component {

  render() {
  	return (
	    	<Modal show={this.props.showModal} onHide={this.props.closeModal} style={{marginTop:'120px'}}>
	          <Modal.Header closeButton>
	          	Fly to Location
	          </Modal.Header>
	          <Modal.Body >
	          	<FlyToLocationForm centerLocation={this.props.centerLocation} closeModal={this.props.closeModal}/>
	          </Modal.Body>
	        </Modal>
  	);
  }
}

export default FlyToLocationModal;