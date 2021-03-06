# Enterprise Web Development Assignment 1 - ReactJS app.

Name: Colm Carew

## Overview
Simple Route is a Web Application written using the React JavaScript Library. The core idea of the application is to; using a Map view, create a Single Page Applications (SPA) which gives the user the easiest directions to their desired locations. In creating this solution the goal is also to exhibit some of the React concepts learned throughout the React lectures of the Enterprise Web Development module.


### Feature List
  
 + Centring the map on the user's current location + placing a marker
 + Flying to a location/address specified by the user and placing a marker there
 + Directions from one location to another giving the simplest route obtained from Google Direction Services (simplest is defined by the lowest number of turns)
 + Storing the user's preferences such that the user can pick the units (Imperial or Metric), the mode of transport (Car, Walk etc.), the option of avoiding tolls and the option of avoiding motorways/highways
 + Storing of the user's searched directions and displaying the most recent 10 searched in descending order of recency (most recent first) and providing a link to generate the directions again
 + A paramaterised URL which allows the user to share their searched directions

## Installation requirements.
Please see the file SimpleRouteEntWebDev.pdf in the root of this project for more information of its functionality and how to set it up.

Ensure you have a firebaseConfig.json file in the config folder of this project with following content using your own Keys + Links :

{
    "apiKey": "XXXXXXX",
    "authDomain": "XXXXXXX",
    "databaseURL": "XXXXXXX",
    "storageBucket": "XXXXXXX",
    "messagingSenderId": "XXXXXXX"
}

Ensure you have a googleMapsAPIKey.json file in the config folder  of this project with the following content :

{
  "apiKey" : "XXXXX"
}

- Side note - index.html, which is located in the public folder, the API key will need to be changed here as there was no way around having the Google Maps JS script with the API Key in this file.


Ensure you have a  auth0Config.json file in the config folder  of this project with following content using your own Keys + Links :

{
  "apiKey": "XXXXX",
  "userUrl": "XXXXX"
}

Once completed run 'npm install' in the root of the project.
Once all packages are installed run 'npm start'

### List of Software + Technologies Used
+ Node 6.10.0
+ npm 3.10.10
+ create-react-app tool
+ ReactJS v15.4.2
+ Bootstrap 3
+ React Google Maps 6
+ Superagent 3
+ React Select 1
+ React Router 2
+ Firebase 3
+ Auth0 Lock 10

## Data Model Design.

Overall the data model is quite simple. The User's preferences are stored in a user table with the user id being the key of the table. The user table contains all preferences mentioned in the profile as well as the username, email and authentication provider of the user.

The directions table is used to store the searched user directions, it contains a key pointing back to the user table and has the start address, end address and date searched.

![Data Model][dataModel]

Example Entry in User Table as is in Firebase :

{
	avoidHighways: false,
	avoidTolls: false,
	email: "colmcarew2@gmail.com",
	provider: "google-oauth2",
	travelMode: "DRIVING",
	unitSystem: "METRIC",
	username: "Colm C"
}

Example Entry in the Directions Table as is in Firebase :

{
	date_searched: "2017-03-20T22:29:51.558Z",
	end_address: "Dublin Airport, Dublin, Ireland",
	start_address: "Wexford",
	user_id: "google-oauth2|XXXXXXXX"
}

Again this is very basic data. A nice feature for furture development would be to store saftey information regarding neighbourhoods and areas such that the user could opt to get directions the safest way possible. Ideally the user would also be able to add data into safety information saying whether a neighbourhood was safe or not. Another nice feature would be to track the user's location and store them in a seperate table so the user would be able to see where they have been and also if anyone was using their account when they should not have been.

## App Component Design.

### Main Component Model

The main components model is made up of Login, Home, Profile and About. Login is of course the login page. Home is the main part of the application where the map resides. Profile is the User's profile and About is a simple about page of the Application. Each component underneath the Login (Home, Profile etc.) use the same Navigation Bar.
![][mainModel]

### Home Component Model

Underneath the Home component there is the Custom Navbar (shared by most main pages) and the Google Map. Inside Google Map there is Google Maps itself as well as a Custom Map Marker. As for the Custom Navbar there are links to the Home Page, Profile Page, About Page and a Logout option. If the user is in the Home page then there are also Map Options available. These Map Options are 'Centre Map' which centres the map at the user's current location (if allowed by browser) and plots a marker. There is 'Fly to Location' which bring up a Single Input Field Form within a Custom Modal that the user enters an address they wish to fly to. This places a marker at that address. Finally there is 'Get Directions' this is another form displated by the Modal which allows the user to get directions between two addresses.

![][homeModel]

### Profile Component Model

The profile component is used to track user preference information and display their most recent direction searches. The Custom Navbar in this case is the same as in Home however Map Options are disabled. Profile Details are essentially a small table containing the user's thumbnail, name and email. Profile Preferences and Profile Directions each use Firebase for database storage and retrieval. Profile Preferences contains the user's preferences, that is the unit they want the directions in, the transport type (car, cycle etc.), whether to avoid tolls or not and whether to avoid highways/motorways or not. Profile Directions displays the last 10 directions the user searched, in a table format and provides a link to generate the directions once again (it will take whatever the current preferences are into consideration when calculating the directions).

![][profileModel]

There is no model for the about page as the about page is simply a single Bootstrap Jumbotron displaying some basic information about the application.

## UI Design.

![][loginScreen]

The login screen gives the Icon of the Application and a button which starts the Auth0 Lock Authenticaion pop up.

![][loginMenu]

This is the Auth0 Login Menu with all the available options for logging in and also gives the ability to sign up an email and password.

![][homeScreenMap]

Once the user is authenticated they are brought to the home screen. The home screen displays a near full screen map as well as a navigation bar. The map was chosen to be full screen as it gives a more stock feel than if the map was in a smaller segment.

![][flyToLocation]

When Map Options is selected from the Navbar followed by Fly to Location the following screen is rendered. This is a Modal that is being displayed and the content of the Modal is the passed in form which in this case is the Fly to Location form. When an address is entered the user will fly to this location on the map with a marker put at the address. If there is no valid location then an alert box will pop up alerting the user they entered an invalid address (alternatively they entered and address Google does not have).

![][directionsForm]

When Map Options is selected from the Navbar followed by 'Get Directions' the following screen is rendered. Directions also use the Modal as clicking the 'Get Directions' option passes in the Directions Form to the modal and displays the modal. If incorrect locations are searched or there is no route between the two locations an alert box pops up alerting the user. When valid addresses are entered however the simplest route between the two points will be plotted on the map and the directions will appear on the right hand side of the page. Again the simplest route is defined as the route with the lowest number of turns.

![][mapWithDirections]

Once valid directions are searched for the resulting screen is similar to above. The directions appear on the right hand side of the page. If the user navigates away from the page the right panel will disappear. Note this page generates a paramaterised URL which can be shared so other user's may get directions. Note in this case the directions are calculated based on the user's preferences. The reason it was chosen this way is that not everyone will be driving or cyclying etc.

![][profileBasicInfo]

The profile page is navigated to by clicking Profile in the Navbar. The page contains the Navbar and is broken into sections. The first section of the page is quite basic, giving the user's profile photo of whatever provider they signed up with, the user's name and their email.

![][preferences]

Preferences are underneath the basic information. Each of the options available are used in calculating the user’s directions. The values are stored in a Firebase database table titled ‘user’. Travel Mode and Units are each dropdowns. All 4 available options are set to default as above and if the user clicks on one it is automatically updated in the Firebase Database. Note when the Profile page loads the default values will be present but the user’s actual preferences should load by the time they click on one.

![][directionsTable]

Directions table is underneath preferences. This is a table generated from the user’s most recent 10 searched directions with the number on the left hand side of the table having a link which will bring up the directions via the parameterised URL when clicked. These are stored in the ‘directions’ table in the Firebase database. This table may take a second to load when the user goes to the profile page. This is just a React component re-render and not an entire page re-render. This is due to the latency of reading the data from a database.

![][aboutPage]

The about page is accessed by clicking the About link in the Navbar. Overall it is a simple page which has the Navbar as well as a brief summary of the purpose of the application as well as it's Github link.

## Routing.
+ /login - login page
+ /about - about page
+ /home - home page of app - the Map
+ /home/directions/:fromLocation/:toLocation - Paramaterised URL, (:fromLocation) is the starting address and (:toLocation) is the end address - returns a Map with directions based on the user's preferences
+ /profile - logged in user's profile
+ /logout - logout of app and directed back to login back
+ Anything else results in the not found page

## Extra features

User registration and Authentication is handled by Auth0 which is an SSO solution. In this App it is used to handle the Login via Google, Facebook, Twitter or Auth0 (basic email/password).

The backend database is handled by Firebase which is an Application Infrastructure. It is similar in ways to Auth0 but was chosen to be used as the database as an Android App (with the same name) is being developed after this SPA and the Android App uses firebase so ideally the two Apps sharing the same user data (watch this space). 

## Independent learning.
Google Maps is one of the main independent learning points as it is integrating with a 3rd party API - Google Maps + Google Maps Services. The same can be said for Auth0 and Firebase as neither are covered in the notes and are both also 3rd party APIs. Firebase required some indexing of the user id in the directions table to make querying faster.

For more information please see the file SimpleRouteEntWebDev.pdf in the root of this project.


[dataModel]: ./readmeResources/SimpleRouteReactDataModel.png
[homeModel]: ./readmeResources/SimpleRouteReactHomeModel.png
[mainModel]: ./readmeResources/SimpleRouteReactMainModel.png
[profileModel]: ./readmeResources/SimpleRouteReactProfileModel.png
[homeScreenMap]: ./readmeResources/homeScreenMap.png
[loginMenu]: ./readmeResources/loginMenu.png
[loginScreen]: ./readmeResources/loginScreen.png
[profileBasicInfo]: ./readmeResources/profileBasicInfo.png
[mapWithDirections]: ./readmeResources/mapWithDirections.png
[flyToLocation]: ./readmeResources/flyToLocation.png
[directionsForm]: ./readmeResources/getDirectionForm.png
[aboutPage]: ./readmeResources/aboutPage.png
[directionsTable]: ./readmeResources/directionTable.png
[preferences]: ./readmeResources/preferences.png