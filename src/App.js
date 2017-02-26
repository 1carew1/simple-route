import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';


import './App.css';

class App extends Component {
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
    return (
      <div className="App">
         <div className="App-header">
            <h2>Welcome to Simple Route</h2>
            <p>The quickest way is not always the simplest way!</p>
         </div>
         <div style={{ height: '100%'}}>
             {this.content}
         </div>
      </div>
    );
  }
}

export default App;
