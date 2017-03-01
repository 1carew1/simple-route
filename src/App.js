import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import CustomNavbar from './views/Main/Navigation/CustomNavbar';


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
      <div style={{backgroundColor: '#222'}}>
        <CustomNavbar />
           <div style={{ height: '100%'}}>
               {this.content}
           </div>
      </div>
    );
  }
}

export default App;
