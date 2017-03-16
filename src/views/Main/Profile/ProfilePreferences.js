import React, { PropTypes as T } from 'react';
import {Jumbotron} from 'react-bootstrap';

import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import './jumbostyle.css';

import firebase from 'firebase';
import firebaseConfig from  '../../../../firebaseConfig.json';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export class ProfileDetails extends React.Component {
  constructor() {
      super();
      this.state = {
        dropDownValue : 'One',
        testData : 1
      };

      //TODO : Replace This with something useful
      this.readUserData(1);
  }

  static propTypes = {
    profile: T.object,
  }
 
 //Dummy Write
 writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('test/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
 }

 // Dummy Read User Data
 readUserData(userId) {
    const stupidString = 'stsfsdf ';
    firebase.database().ref('/test/' + userId).once('value').then(function(snapshot) {
      console.log(snapshot.val().username);
      console.log(snapshot.val().email);
    });
 }

  onDropdownSelected(dropDownObject) {
    if(dropDownObject && dropDownObject.value) {
          this.writeUserData(1, 'colm', 'colmcarew2@gmail.com', dropDownObject.value);

          console.log('Value Selected : ' + dropDownObject.value);
          this.setState({
            dropDownValue : dropDownObject.value
          });
    }
  }

  render() {
    const { profile } = this.props;
    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ];

    return (
      <Jumbotron className="centerJumbo">
        
        <h2>Preferences</h2>

        <Select
            style={{width:'20%', marginLeft:'40%', marginRight:'40%'}}
            name="form-field-name"
            value={this.state.dropDownValue}
            options={options}
            onChange={this.onDropdownSelected.bind(this)}
        />
        <p>{this.state.testData}</p>
      </Jumbotron>
    )
  }
}

export default ProfileDetails;