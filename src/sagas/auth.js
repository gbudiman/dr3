import axios from 'axios';
import { put, takeEvery, all } from 'redux-saga/effects'

const api = (path) => { return 'http://devdrdb.dystopiarisingnetwork.com:5000/api/' + path }
const config = {
  headers: {
    'Authorization': null
  }
}

const generateToken = async() => {
  try {
    const res = await axios.get(
      api('generateToken'), 
      { auth: { username: 'test', password: 'test1234'} });

    config.headers['Authorization'] = 'Bearer ' + res.data.access_token;
  } catch(error) {
    console.log('Authenticaion failure')
    console.log(error);
  }
}

const fetchCharacters = async() => {
  try {
    const res = await axios.get(api('characters'), config)
  } catch(error) {
    console.log('Failed to fetch characters')
  }
}

function* auth() {
  yield generateToken();
  yield fetchCharacters();
  yield put({ type: 'REMOTE_CHARACTERS_LOADED '});
}

export default function* rootSaga() {
  yield all([auth()])
}