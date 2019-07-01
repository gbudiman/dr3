import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Container';
import Characters from './utils/CharacterUtil';
import Skills from './Skills/Page';
import Feedback from './Feedback/Page';
import './App.scss';

export default ({ isLoggedIn, theme }) => (
  <Switch className='builder'>
    <Route
      exact
      path='/'
      render={() => (isLoggedIn ? <Characters /> : <Login />)}
    />
    <Route
      path='/characters'
      render={() => (isLoggedIn ? <Characters /> : <Login />)}
    />
    <Route path='/skills' component={Skills} />
    <Route path='/feedback' component={Feedback} />
  </Switch>
);
