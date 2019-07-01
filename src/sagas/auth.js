import axios from 'axios';
import { put, takeEvery, all } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const generateToken = async() => {
  let res = await axios.get(
    'http://devdrdb.dystopiarisingnetwork.com:5000/api/generateToken', 
    { auth: { username: 'test', password: 'test1234'} });
  console.log(res);
}

function* auth() {
  let token = generateToken();
}



export default function* rootSaga() {
  yield all([auth()])
}