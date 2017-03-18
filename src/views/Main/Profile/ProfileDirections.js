import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import FirebaseDatabaseService from '../../../utils/FirebaseDatabaseService';

import './jumbostyle.css';

const firebaseDatabaseService = new FirebaseDatabaseService();

let someList = null;
export class ProfileDirections extends React.Component {

  componentDidMount(){
    let functionToRunOnResults = (results) => {

      if(results) {
       someList = results.map((value, index) => {
          return <li key={index}>{value.start_address} - TO - {value.end_address} - On - {value.date_searched}</li>;
        });      
      } 
      this.setState({});
    }
    firebaseDatabaseService.retrieveLastXDirectionsOfUser(this.props.profile, 10, functionToRunOnResults.bind(this)); 
  }

  render() {
    return (
      <Jumbotron className="centerJumbo">
          <h3>Recently Searched Directions :</h3>
          <ul>{someList}</ul>
      </Jumbotron>
    )
  }
}

export default ProfileDirections;