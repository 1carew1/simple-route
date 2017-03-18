import firebase from 'firebase';
import firebaseConfig from  '../../firebaseConfig.json';

firebase.initializeApp(firebaseConfig);


const database = firebase.database();

export default class FirebaseDatabaseService {

 //Write Initial User
 writeUserData(profile) {
  let name = profile.name;
  if(!name) {
 	name = '';
  }
  let email = profile.email;
  if(!email) {
  	email = '';
  }
  database.ref('/user/' + profile.user_id).set({
    username: name,
    email: email,
    travelMode : 'DRIVING',
    avoidTolls : false,
    avoidHighways : false,
    unitSystem : 'METRIC'
  });
 }


 // Update the users travel preference i.e. walk, car, etc
 updateUserTravelMode(userId, travelMode) {
  database.ref('/user/' + userId).update({
    travelMode: travelMode
  });
 }

  // Update the users units - metric or imperial
 updateUserUnits(userId, unit) {
  database.ref('/user/' + userId).update({
    unitSystem: unit
  });
 }

 // Update the user avoid motorway
 updateUserAvoidMotorway(userId, avoid) {
  database.ref('/user/' + userId).update({
    avoidHighways: avoid
  });
 }

 // Update the user avoid tolls
 updateUserAvoidTolls(userId, avoid) {
  database.ref('/user/' + userId).update({
    avoidTolls: avoid
  });
 }


 // Read User Data
 readUserData(profile) {
 	if(profile) {
 		const createUserInfo = this.writeUserData;
	 	database.ref('/user/' + profile.user_id).once('value').then(function(snapshot) {
	    	if(snapshot && snapshot.val()) {
		      //console.log('User Logged In : ' + snapshot.val().username);
	    	} else {
	    	 //Create Default User Info
	    	 createUserInfo(profile);
	    	}
	    });	
 	}   
 }

 readUserDataAndExecuteFunction(profile, incomingFunction) {
 	if(profile) {
	 	database.ref('/user/' + profile.user_id).once('value').then(function(snapshot) {
	    	if(snapshot && snapshot.val()) {
	    	  // Execture the parameter function with whatever the values returned are
		      incomingFunction(snapshot.val());
	    	} 
	    });	
 	}   
 }

}

