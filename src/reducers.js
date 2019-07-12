import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import characterReducer from './Characters/reducers';
import userReducer from './User/reducers';

export default history =>
  combineReducers({
    characters: characterReducer,
    form: formReducer,
    router: connectRouter(history),
    user: userReducer
  });
