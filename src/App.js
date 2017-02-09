import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Places from './components/Places';

class App extends Component {
  render() {
    const location = {
      lat : 40.7575285,
      lng : -73.9884469
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Places/>
        </p>
       <div style={{width:500, height:600, background:'red'}}>
          <Map center={location}/>
      </div>
      </div>
    );
  }
}

export default App;
