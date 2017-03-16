import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from '../../utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import About from './Info/About'
import Profile from './Profile/Profile'

const auth = new AuthService('a5zFT3PXpUFAzBb8d5KA9uYV0NhCiuls', '1carew1.eu.auth0.com');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
}

// onEnter of login, logout
const logout = (nextState, replace) => {
  if (auth && auth.loggedIn()) {
    auth.logout();
  }
}

//TODO : Add routes so that map directions are linkable, similar with fly to and centre

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Login} onEnter={logout} />
    </Route>
  )
}

export default makeMainRoutes
