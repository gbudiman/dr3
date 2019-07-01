import React, { useEffect } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';
import { switchTab } from './utils/NavigationUtil';
import AppBarWrapper from './components/appbars/AppBarWrapper';

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/auth'
import reducer from './reducers'

const App = () => {
  const su = StateUtil();
  const toonUtil = ToonUtil();
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  )
  const action = type => store.dispatch({type})

  useEffect(() => {
    toonUtil.handleAppLoad(su);
    sagaMiddleware.run(rootSaga);
  }, su);

  return (
    <div className='app-window'>
      <AppBarWrapper su={su} passChange={toonUtil.handleToonChange} />
      <div className='builder'>{switchTab(su)}</div>
      <Navigation setTab={su.setTab} tab={su.tab} />
    </div>
  );
};

export default App;
