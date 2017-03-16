import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import makeRoutes from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';

const routes = makeRoutes()

const mountNode = document.querySelector('#root');

ReactDOM.render(
  <App history={browserHistory}
        routes={routes} />,
mountNode
);
