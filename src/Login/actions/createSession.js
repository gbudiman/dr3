import axios from 'axios';
import { CREATE_SESSION } from '../types';

export default values => dispatch =>
  axios
    .post('/api/login', values)
    .then(res =>
      dispatch({
        type: CREATE_SESSION,
        payload: {
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          token: res.data.token
        }
      })
    )
    .catch(err => console.log(err));
