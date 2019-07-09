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
import { appSaga } from './sagas/auth';
import reducer from './reducers';

const App = () => {
  const su = StateUtil();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    su,
    //applyMiddleware(sagaMiddleware),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(appSaga);

  useEffect(() => {
    store.dispatch({ type: 'APP_LOAD' })
  }, su);

  return (
    <Provider store={store}>
      <div className='app-window'>
        <AppBarWrapper />
        <div className='builder'>{switchTab(su, store)}</div>
        <Navigation setTab={su.setTab} tab={su.tab} />
      </div>
    </Provider>
  );
};

export default App;
