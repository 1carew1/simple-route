import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';

class TestParameter extends Component {
  render() {
    console.log(this.props.params.from);
    console.log(this.props.params.to);
  	return (
      <Jumbotron>
      TEST : from : {this.props.params.from}, to : {this.props.params.to}
      </Jumbotron>
  	);
  }
}

export default TestParameter;