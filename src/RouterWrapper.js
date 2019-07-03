import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login/Container';
import Characters from './utils/CharacterUtil';
import Skills from './Skills/Page';
import Feedback from './Feedback/Page';
import './App.scss';

const RouterWrapper = props => {
  const isLoggedIn = true;

  return(
    <Router>
      <Switch className='builder'>
        <Route
          exact
          path='/'
          render={() => (isLoggedIn ? <Characters su={props.su} /> : <Login />)}
        />
        <Route
          path='/characters'
          render={() => (isLoggedIn ? <Characters su={props.su} /> : <Login />)}
        />
        <Route path='/skills' component={Skills} />
        <Route path='/feedback' component={Feedback} />
      </Switch>
    </Router>
  )
}

export default RouterWrapper;