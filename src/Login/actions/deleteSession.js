import axios from 'axios';
import { DELETE_SESSION } from '../types';
import history from '../../history';

export default () => dispatch =>
  axios
    .get('/auth/logout')
    .then(() => dispatch({ type: DELETE_SESSION }))
    .then(history.push('/'))
    .catch(err => console.log(err));
