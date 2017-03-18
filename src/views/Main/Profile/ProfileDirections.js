import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import FirebaseDatabaseService from '../../../utils/FirebaseDatabaseService';

import './jumbostyle.css';

const firebaseDatabaseService = new FirebaseDatabaseService();

let someList = null;
export class ProfileDirections extends React.Component {

  componentDidMount(){
    let directionResults = [];
    let functionToRunOnResults = (results) => {
      console.log(results);
      directionResults.push(results);
    }
    firebaseDatabaseService.retrieveLastXDirectionsOfUser(this.props.profile, 10, functionToRunOnResults);


    if(directionResults) {
      directionResults.map((value, index) => {
        return <li>{value.start_address}</li>;
      });      
    }  
  }

  render() {
    const { profile } = this.props;



    return (
      <Jumbotron className="centerJumbo">
          <h3>Recently Searched Directions :</h3>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
          <ul>{someList}</ul>
      </Jumbotron>
    )
  }
}

export default ProfileDirections;