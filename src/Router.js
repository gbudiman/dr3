import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Container';
import Characters from './utils/CharacterUtil';
import Skills from './Skills/Page';
import Feedback from './Feedback/Page';
import './App.scss';

export default ({ isLoggedIn }) => (
  <Switch className='builder'>
    <Route path='/login' component={Login} />
    <Route exact path={['/', '/characters']} component={Characters} />
    <Route path='/skills' component={Skills} />
    <Route path='/feedback' component={Feedback} />
  </Switch>
);
