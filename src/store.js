import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import history from './history';
import createRootReducer from './reducers';

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose
    : composeWithDevTools || compose;
export const sagaMiddleware = createSagaMiddleware();
const middleware = [routerMiddleware(history), sagaMiddleware, thunkMiddleware];

export default su =>
  createStore(
    createRootReducer(history),
    { characters: su },
    enhancer(applyMiddleware(...middleware))
  );
