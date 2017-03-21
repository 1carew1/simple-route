# Enterprise Web Development Assignment 1 - ReactJS app.

Name: Colm Carew

## Overview.
Simple Route is a Web Application written using the React JavaScript Library. The core idea of the application is to; using a Map view, create a Single Page Applications (SPA) which gives the user the easiest directions to their desired locations. In creating this solution the goal is also to exhibit some of the React concepts learned throughout the React lectures of the Enterprise Web Development module.


 . . . . . Feature List . . . . 
 
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

. . . .  List of software used to develop the app . . . . . . . 
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

<div style="text-align:center" markdown="1">
![Data Model][dataModel]
</div>

Use meaningful sample data. Briefly explain any non-trivial issues.

## App Component Design.

### Main Component Model

![][mainModel]

### Home Component Model

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

## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app . . . . . .  

## Independent learning.
Google Maps React Tutorial : https://www.youtube.com/watch?v=N1J7Q1qJPQM

Auth0


[dataModel]: ./readmeResources/SimpleRouteReactDataModel.png
[homeModel]: ./readmeResources/SimpleRouteReactHomeModel.png
[mainModel]: ./readmeResources/SimpleRouteReactMainModel.png
[profileModel]: ./readmeResources/SimpleRouteReactProfileModel.png