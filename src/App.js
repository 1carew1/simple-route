import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Places from './components/Places';
import superagent from 'superagent';

class App extends Component {
  componentDidMount() {
    console.log('componentDidMount')

    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7575285,-73.9884469&key=AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ'
    // Run Superage to get API Requests e.g. Google Maps Geocoding
    superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {
        console.log(JSON.stringify(response.body));
    })
  }

  render() {
    const location = {
      lat : 40.7575285,
      lng : -73.9884469
    };

    // Render an Array of Markers
    const markers = [
        {
          location : {
              lat : 40.7575285,
              lng : -73.9884469
          }
        }
    ]

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Places/>
        </p>
       <div style={{width:500, height:600}}>
          <Map center={location} markers={markers}/>
      </div>
      </div>
    );
  }
}

export default App;
