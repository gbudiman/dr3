import React, { useEffect } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import { switchTab } from './utils/NavigationUtil';
import AppBarWrapper from './components/appbars/AppBarWrapper';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/auth';
import reducer from './reducers';

const App = () => {
  const su = StateUtil();
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    su,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  const action = type => store.dispatch({type})

  useEffect(() => {
    store.dispatch({ type: 'APP_LOAD' })
    sagaMiddleware.run(rootSaga);
  }, su);

  return (
    <Provider store={store}>
      <div className='app-window'>
        <AppBarWrapper store={store} su={su} />
        <div className='builder'>{switchTab(su, store)}</div>
        <Navigation setTab={su.setTab} tab={su.tab} />
      </div>
    </Provider>
  );
};

export default App;
