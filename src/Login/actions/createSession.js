import axios from 'axios';
import { CREATE_SESSION } from '../types';

export default (values) => dispatch =>
  axios
    .get('http://devdrdb.dystopiarisingnetwork.com:5000/api/generateToken', {
      auth: {
        username: values.email,
        password: values.password,
      }
    })
    .then(res =>
      dispatch({
        type: CREATE_SESSION,
        payload: {
          access_token: res.data.access_token,
        }
      })
    )
    .catch(err => console.log(err));