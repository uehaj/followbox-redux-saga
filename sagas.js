import { delay } from 'redux-saga';
import { race, take, put, call, fork, join, cancel, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';
import * as Api from './services/api';

// show modal dialog and get user response(Ok/Cancel) synchronously
function* askYesNo(content) {
  yield put(Actions.setModal({ show: true, title: "Are you sure?", content }));
  const answer = yield race({
    ok: take(Types.UI_MODAL_OK),
    cancel: take(Types.UI_MODAL_CANCEL),
  });
  yield put(Actions.setModal({ show: false }));
  return answer;
}

// remove and get new follower
function* remove(users, action) {
  // make sure to remove
  if (action.payload.verify && !(yield askYesNo(<div>Delete and refresh this follower?</div>)).ok) {
    return;
  }
  // get one random user from the users list
  const user = users[Math.floor(Math.random() * users.length)];
  yield put(Actions.setFollower({ idx: action.payload.idx, user }));
}

// refresh all folllowers
export function* refresh(action) {
  // make sure to refresh
  if (action.payload.verify && !(yield askYesNo(<div>Refresh all followers?<br /></div>)).ok) {
    return;
  }
  // remove all followers on screen immediately
  yield [0, 1, 2].map((i) => put(Actions.setFollower({ idx: i, user: { avatar_url: null } })));

  try {
    // get user list pool (reuse following remove calls)
    yield put(Actions.setLoading(true));
    const users = yield call(Api.getNewUsers);
    yield put(Actions.setLoading(false));
    // remove and refresh all followers
    yield [0, 1, 2].map((i) => fork(remove, users, Actions.remove({ idx: i, verify: false })));
    // wait until remove link[x] clicks
    yield takeLatest(Types.UI_REMOVE, remove, users);
  } catch (e) {
    console.error(e);
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield takeLatest(Types.UI_REFRESH, refresh);
}
