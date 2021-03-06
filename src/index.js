import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import './index.css';
import {App} from './App';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router>
      <App/>
    </Router>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);