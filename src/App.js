import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';

import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Places from './components/Places';
import superagent from 'superagent';

class App extends Component {
  componentDidMount() {
    // console.log('componentDidMount')

    //Address to Lat Lng

    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ

    //Lat Lng to Address

    //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7575285,-73.9884469&key=AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ


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
            return obj.formatted_address;
        });
        console.log('componentDidMount : Got ' + addresses.length + ' addresses from Google');

        const latlngs = results.map((obj, i) => {
            const latlng = obj.geometry.location;
            return latlng;
        });
        console.log('componentDidMount : Got ' + latlngs.length + ' latlngs from Google');
        localStorage.setItem('latlngs', JSON.stringify(latlngs));
        localStorage.setItem('addresses', JSON.stringify(addresses));

        // Reload the page
        this.setState({});
        // console.log(addresses);
    })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  };

  get content() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history} />
    )
  }

  render() {
    let location = {
      lat : 40.7575285,
      lng : -73.9884469
    };
    const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    const latlngs = JSON.parse(localStorage.getItem('latlngs') || '[]');
    return (
      <div className="App">
         <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
              <div style={{ height: '100%' }}>
                {this.content}
              </div>
         </div>
         <div style={{width:500, height:600, margin:10}}>
            <Map center={location} markers={latlngs}/>
        </div>
        <div>
          <Places addresses={addresses}/>
      </div>
      </div>
    );
  }
}

export default App;
