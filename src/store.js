import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import history from './history';
import createRootReducer from './reducers';

const middleware = [routerMiddleware(history), thunk];
const initialState = {};
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose
    : composeWithDevTools || compose;

export default createStore(
  createRootReducer(history),
  initialState,
  enhancer(applyMiddleware(...middleware))
);
