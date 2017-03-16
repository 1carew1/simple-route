import firebase from 'firebase';
import firebaseConfig from  '../../firebaseConfig.json';

firebase.initializeApp(firebaseConfig);


const database = firebase.database();

export default class FirebaseDatabaseService {

 //Write Initial User
 writeUserData(profile) {
  database.ref('/user/' + profile.user_id).set({
    username: profile.name,
    email: profile.email,
    travelMode : 'DRIVING',
    avoidTolls : 'false',
    avoidHighways : 'false',
    unitSystem : 'METRIC'
  });
 }


 // Update the users travel preference i.e. walk, car, etc
 updateUserTravelMode(userId, travelMode) {
  database.ref('/user/' + userId).update({
    travelMode: travelMode
  });
 }


 // Read User Data
 readUserData(profile) {
 	if(profile) {
 		const createUserInfo = this.writeUserData;
	 	database.ref('/user/' + profile.user_id).once('value').then(function(snapshot) {
	    	if(snapshot && snapshot.val()) {
		      console.log('User Logged In : ' + snapshot.val().username);
	    	} else {
	    	 //Create Default User Info
	    	 createUserInfo(profile);
	    	}
	    });	
 	}   
 }
}

