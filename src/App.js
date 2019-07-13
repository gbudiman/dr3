import React, { useEffect } from 'react';
import './App.scss';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';
import { Provider } from 'react-redux';
import createStore, { sagaMiddleware } from './store';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import AppBarWrapper from './components/appbars/AppBarWrapper';
import Router from './Router';
import Navigation from './components/Navigation/Navigation';
import { appSaga } from './sagas/auth';
import { APP_LOAD } from './Characters/types';

export default () => {
  const su = StateUtil();
  const store = createStore(su);
  sagaMiddleware.run(appSaga);
  const toonUtil = ToonUtil();
  useEffect(() => {
    store.dispatch({ type: APP_LOAD });
  }, su);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='app-window'>
          <AppBarWrapper />
          <Router su={su} />
          <Navigation setTab={su.setTab} tab={su.tab} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
};
