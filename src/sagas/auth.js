import axios from 'axios';
import { call, put, putResolve, takeEvery, takeLatest, all, race, throttle, fork } from 'redux-saga/effects'

let lastPayload = null;
const api = (path) => { return 'http://devdrdb.dystopiarisingnetwork.com:5000/api/' + path }
const config = {
  headers: {
    'Authorization': null
  }
}
// const inverseStrainLookup = {};
// const strainLookup = {};

const generateToken = async() => {
  return await axios.get(
    api('generateToken'), 
    { auth: { username: 'test', password: 'test1234'} }
  );
}

const configureJWT = (token) => { config.headers['Authorization'] = 'Bearer ' + token }
const updateCharacter = async(remoteId, body) => {
  return await axios.put(api('character/' + remoteId), body, config);
}
// const fetchCharacter = async(remoteId) => { return await axios.get(api('character/' + remoteId), config) }
// const fetchRemoteStrains = async() => { return await axios.get(api('strains')) }
// const fetchRemoteSkills = async() => { return await axios.get(api('skills')) }
// let remoteStrainsLoaded = false;

// function* fetchStrains() {
//   if (remoteStrainsLoaded) return;

//   try {
//     const remoteStrains = yield call(fetchRemoteStrains);
//     yield put({ type: 'REMOTE_STRAINS_LOADED', payload: remoteStrains.data })
//     remoteStrainsLoaded = true;
//   } catch (e) {
//     console.log(e);
//   }
// }

// function* fetchSkills() {
//   try {
//     const remoteSkills = yield call(fetchRemoteSkills);
//   } catch (e) {
//     console.log(e);
//   }
// }

// function* fetchRemoteCharacter(params) {
//   console.log(params);
//   try {
//     const characterData = yield call(fetchCharacter, params.payload.remoteId);
//     yield put({
//       type: 'SWITCH_CHARACTER_WITH_REMOTE_DATA',
//       payload: {
//         characterData: characterData.data,
//         strainLookup: strainLookup,
//         tid: params.payload.toonId,
//       }
//     })
//   } catch (e) {
//     console.log(e);
//   }
// }

function* auth() {
  try {
    const token = yield call(generateToken);
    yield configureJWT(token.data.access_token);
  } catch(e) {
    console.log(e);
  }
}

// function* fetchCharacters(params) {
//   const fetch = async() => { return await axios.get(api('characters'), config) }

//   try {
//     console.log('begin fetching characters');
//     const remoteCharacters = yield call(fetch);
//     console.log('characters data available');
//     yield put({ 
//       type: 'REMOTE_CHARACTERS_LOADED', 
//       payload: {
//         characterData: remoteCharacters.data,
//         strainLookup: strainLookup,
//       }
//     });

//   } catch(e) {
//     console.log(e);
//   }
// }

function* watchStrainChange() {
  yield takeLatest('STRAIN_CHANGED', queueUpstream);
}

function* watchNameChange() {
  yield takeLatest('RENAME_CHARACTER', queueUpstream);
}

function* watchStatValidChange() {
  yield takeLatest('STAT_VALID_CHANGE', queueUpstream);
}

function* watchSkillsChange() {
  yield takeLatest('SKILLS_CHANGED', queueUpstream);
}

function* watchLocalStorageLoaded() {
  yield takeLatest('APP_LOAD', auth);
}

// function* watchLoginSuccessful() {
//   yield takeLatest('LOGIN_SUCCESSFUL', fetchCharacters);
// }

function* queueUpstream(action) {
  const payload = action.payload;
  const timeNow = parseInt(Date.now() / 1000);
  let upstreamData = null;

  if (lastPayload === payload) {
    // pass
  } else {
    lastPayload = payload;
    console.log(action);
    switch(action.type) {
      case 'STRAIN_CHANGED': upstreamData = { strain_id: payload.strainId }; break;
      case 'RENAME_CHARACTER': upstreamData = { name: payload.value }; break;
      case 'STAT_VALID_CHANGE': upstreamData = { [payload.stat]: payload.value }; break;
      case 'SKILLS_CHANGED': 
        upstreamData = { skills: payload.value }; 
        break;
    }

    if (payload.remoteId) {
      yield updateCharacter(payload.remoteId, upstreamData);
    }
  }
}

export function* appSaga() {
  yield all([
    // fetchStrains(),
    // fetchSkills(),
    watchLocalStorageLoaded(),
    watchNameChange(),
    watchStrainChange(),
    watchStatValidChange(),
    watchSkillsChange(),
    // watchLoginSuccessful(),
  ]);
}

// export function* appSaga() {
//   yield all([
//     // fetchStrains(),
//     // fetchSkills(),
//     call(watchLocalStorageLoaded),
//     // watchNameChange(),
//     // watchStrainChange(),
//     call(watchStatValidChange),
//     // watchSkillsChange(),
//     // watchLoginSuccessful(),
//   ]);
// }
