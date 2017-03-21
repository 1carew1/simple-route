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

- Side note - index.html, which is located in the public folder, the API key will need to be changed here as well as using react-google-maps there was no way around having the Google Maps JS script with the API Key in this file.


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

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![Data Model][dataModel]

Use meaningful sample data. Briefly explain any non-trivial issues.

## App Component Design.

### Main Component Model

The main components model is made up of Login, Home, Profile and About. Login is of course the login page. Home is the main part of the application where the map resides. Profile is the User's profile and About is a simple about page of the Application. Each component underneath the Login (Home, Profile etc.) use the same Navigation Bar.
![][mainModel]

### Home Component Model

Underneath the Home component there is the Custom Navbar (shared by most main pages) and the Google Map. Inside Google Map there is Google Maps itself as well as a Custom Map Marker. As for the Custom Navbar there are links to the Home Page, Profile Page, About Page and a Logout option. If the user is in the Home page then there are also Map Options available. These Map Options are 'Centre Map' which centres the map at the user's current location (if allowed by browser) and plots a marker. There is 'Fly to Location' which bring up a Single Input Field Form within a Custom Modal that the user enters an address they wish to fly to. This places a marker at that address. Finally there is 'Get Directions' this is another form displated by the Modal which allows the user to get directions between two addresses.
![][homeModel]

### Profile Component Model

![][profileModel]

## UI Design.

. . . . . Screenshots of app's views (see example below) with appropriate captions (user regeneration and login views, if implemented, can be omitted) . . . . . . . 

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
Google Maps is one of the main independent learning points as it is integrating with a 3rd part API - Google Maps + Google Maps Services. The same can be said for Auth0 and Firebase as neither are covered in the notes and are both also 3rd party APIs.


[dataModel]: ./readmeResources/SimpleRouteReactDataModel.png
[homeModel]: ./readmeResources/SimpleRouteReactHomeModel.png
[mainModel]: ./readmeResources/SimpleRouteReactMainModel.png
[profileModel]: ./readmeResources/SimpleRouteReactProfileModel.png