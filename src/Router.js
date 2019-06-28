import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Container';
import Characters from './utils/CharacterUtil';
import Skills from './Skills/Page';
import Feedback from './Feedback/Page';

export default ({ isLoggedIn }) => (
  <Switch className='builder'>
    <Route exact path='/' component={<Redirect to='/characters' />} />
    <Route
      path='/characters'
      render={() => (isLoggedIn ? <Login /> : <Characters />)}
    />
    <Route path='/skills' component={Skills} />
    <Route path='/feedback' component={Feedback} />
  </Switch>
);
