import { delay } from 'redux-saga';
import { race, take, put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';
import * as Api from './services/api';

export function* close(action) {
  console.log('close 1=>',action);
  yield put(Actions.setFollower({idx: action.payload}));
  console.log("close");
}

export function* refresh() {
  try {
    const users = yield call(Api.getNewUsers);
    console.log("refresh"+users);
    yield fork(close, 0, users[Math.floor(Math.random()*users.length)]);
    yield fork(close, 1, users[Math.floor(Math.random()*users.length)]);
    yield fork(close, 2, users[Math.floor(Math.random()*users.length)]);
  } catch (e) {
    console.error(e);
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield takeLatest(Types.USER_CLOSE, close);
  yield takeLatest(Types.USER_REFRESH, refresh);
}
