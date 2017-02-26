import { delay } from 'redux-saga';
import { race, take, put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';
import * as Api from './services/api';

function* close(users, action) {
  const user = users[Math.floor(Math.random()*users.length)];
  yield put(Actions.setFollower({idx: action.payload, user}));
}

export function* refresh() {
  yield put(Actions.setFollower({idx: 0, user:{avatar_url: null}}));
  yield put(Actions.setFollower({idx: 1, user:{avatar_url: null}}));
  yield put(Actions.setFollower({idx: 2, user:{avatar_url: null}}));

  try {
    const users = yield call(Api.getNewUsers);
    yield* close(users, Actions.close(0));
    yield* close(users, Actions.close(1));
    yield* close(users, Actions.close(2));

    yield takeLatest(Types.USER_CLOSE, close, users);
  } catch (e) {
    console.error(e);
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield takeLatest(Types.USER_REFRESH, refresh);
}
