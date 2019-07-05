import axios from 'axios';
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

const api = (path) => { return 'http://devdrdb.dystopiarisingnetwork.com:5000/api/' + path }
const config = {
  headers: {
    'Authorization': null
  }
}

const generateToken = async() => {
  return await axios.get(
    api('generateToken'), 
    { auth: { username: 'test', password: 'test1234'} }
  );
}

const configureJWT = (token) => { config.headers['Authorization'] = 'Bearer ' + token }
const fetchCharacters = async() => { return await axios.get(api('characters'), config) }
const updateCharacter = async(remoteId, body) => {
  // devdrdb.dystopiarisingnetwork.com:5000/api/characters
  return await axios.put(api('character/' + remoteId), body, config);
}

function* auth() {
  yield console.log('start saga');
  try {
    const token = yield call(generateToken);
    yield configureJWT(token.data.access_token);
    //yield put({ type: 'LOGIN_SUCCESSFUL', payload: token.data.access_token });
    const remoteCharacters = yield call(fetchCharacters);
    yield put({ type: 'REMOTE_CHARACTERS_LOADED', payload: remoteCharacters.data });
  } catch(e) {
    console.log(e);
  }
}

function* watchUpstreamQueue() {
  yield takeLatest('RENAME_CHARACTER', queueUpstream);
}

function* watchLocalStorageLoaded() {
  yield takeLatest('APP_LOAD', auth);
}

function* queueUpstream(action) {
  const payload = action.payload;
  if (payload.remoteId) {
    yield updateCharacter(payload.remoteId, {
      name: payload.value
    });
  }
}

export default function* authSaga() {
  yield all([
    watchLocalStorageLoaded(),
    watchUpstreamQueue(),
  ]);
}