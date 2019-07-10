import React, { useEffect } from 'react';
import './App.scss';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';
import { Provider } from 'react-redux';
import store from './store';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import AppBarWrapper from './components/appbars/AppBarWrapper';
import Router from './Router';
import Navigation from './components/Navigation/Navigation';

export default () => {
  let su = StateUtil();
  let toonUtil = ToonUtil();

  useEffect(() => {
    toonUtil.handleAppLoad(su);
  });

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='app-window'>
          <AppBarWrapper su={su} passChange={toonUtil.handleToonChange} />
          <Router su={su} />
          <Navigation setTab={su.setTab} tab={su.tab} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
};
