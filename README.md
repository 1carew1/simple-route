The purpose of this React App is to fullfil the requirements set out by the Assignment in the Enterprise Web Development Module for Msc. in Communication Software

Google Maps React Tutorial : https://www.youtube.com/watch?v=N1J7Q1qJPQM

This project was initially created with [Create React App](https://github.com/facebookincubator/create-react-app).

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

# Assignment 1 - ReactJS app.

Name: ... your name ...

## Overview.
...... A statement of the app concept and objectives (about a half-page) ........


 . . . . . List of user features (excluding user registration and authentication) . . . . 
 
 + Feature 1
 + Feature 2
 + Feature 3
 + etc
 + etc

## Installation requirements.
. . . .  List of software used to develop the app . . . . . . . 
+ ReactJS v15.4.2
+ Bootstrap 3
+ create-react-app tool
+ etc
+ etc 

. . . . . . Also, explain (to a third party) what steps one must take to run your app after cloning it from the repository, e.g. any non-standard software installation; any environment setup; how to start app; where to view app in browser . . . . . . . At its simplest this may just be: npm install + npm start

## Data Model Design.

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][dataModel]

Use meaningful sample data. Briefly explain any non-trivial issues.

## App Component Design.

A diagram showing the app's hierarchical component design (see example below). 

![][mainModel]

![][homeModel]

![][profileModel]

## UI Design.

. . . . . Screenshots of app's views (see example below) with appropriate captions (user regeneration and login views, if implemented, can be omitted) . . . . . . . 

![][image3]

## Routing.
. . . . List each route supported and state the associated view . . . . . 

+ /foos - displays all published foos
+ /foos/:id - detail view of a particular foo (:id)
+ etc
+ etc

## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app . . . . . .  

## Independent learning.

. . . . . State the non-standard aspects of Angular (or other related technologies) that you researched and applied in this assignment . . . . .  


[dataModel]: ./readmeResources/SimpleRouteReactDataModel.png
[homeModel]: ./readmeResources/SimpleRouteReactHomeModel.png
[mainModel]: ./readmeResources/SimpleRouteReactMainModel.png
[profileModel]: ./readmeResources/SimpleRouteReactProfileModel.png