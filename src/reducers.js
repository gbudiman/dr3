import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import characterReducer from './Characters/reducers';
import skillReducer from './Skills/reducers';
import userReducer from './User/reducers';

export default history =>
  combineReducers({
    characters: characterReducer,
    form: formReducer,
    router: connectRouter(history),
    skills: skillReducer,
    user: userReducer
  });
