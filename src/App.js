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
    // Run Superagent to get API Requests e.g. Google Maps Geocoding
    superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {
        // console.log(JSON.stringify(response.body));
        const results = response.body.results;
        // console.log(results);
        const addresses = results.map((obj, i) => {
            return obj.formatted_address
        });
        // console.log(addresses);
        const mainAddress = addresses[0];
        console.log( 'Main Address is : ' + mainAddress);
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
          <Places/>
       <div style={{width:500, height:600}}>
          <Map center={location} markers={markers}/>
      </div>
      </div>
    );
  }
}

export default App;
