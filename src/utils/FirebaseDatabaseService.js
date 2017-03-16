import firebase from 'firebase';
import firebaseConfig from  '../../firebaseConfig.json';

firebase.initializeApp(firebaseConfig);


const database = firebase.database();

export default class FirebaseDatabaseService {

 //Write Initial User
 writeUserData(profile) {
  firebase.database().ref('/test/' + profile.user_id).set({
    username: profile.name,
    email: profile.email,
    travelTypePreference : 'DRIVING',
    avoidTolls : 'false',
    avoidHighways : 'false',
    unitSystem : 'METRIC'
  });
 }


 // Update the users travel preference i.e. walk, car, etc
 updateUserTravelPreference(userId, travelTypePreference) {
  firebase.database().ref('/test/' + userId).update({
    travelTypePreference: travelTypePreference
  });
 }


 // Read User Data
 readUserData(profile) {
 	if(profile) {
	 	database.ref('/test/' + profile.user_id).once('value').then(function(snapshot) {
	    	if(snapshot && snapshot.val()) {
		      console.log('User Logged In : ' + snapshot.val().username);
	    	} else {
	    	 // this.writeUserData(profile)
	    	}
	    });	
 	}
    
 }
}

