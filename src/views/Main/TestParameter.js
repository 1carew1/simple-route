import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';

class TestParameter extends Component {
  render() {
  	return (
      <Jumbotron>
      TEST : from : {this.props.params.from}, to : {this.props.params.to}
      </Jumbotron>
  	);
  }
}

export default TestParameter;