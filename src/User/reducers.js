import { CREATE_USER, READ_USER, UPDATE_USER } from './types';

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  playerId: null,
  createSuccess: null,
  updateSuccess: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        createSuccess: 'Account successfully created.',
        updateSuccess: null,
        deleteSuccess: null
      };
    case READ_USER:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        createSuccess: null,
        updateSuccess: null,
        deleteSuccess: null
      };
    case UPDATE_USER:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        createSuccess: null,
        updateSuccess: 'Account successfully updated.'
      };
    default:
      return state;
  }
};
