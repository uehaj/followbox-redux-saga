import { delay } from 'redux-saga';
import { race, take, put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';

export function* timer() {
  let result;
  do {
    result = yield race({
      tick: call(delay, 1000),
      stop: take(Types.TIMER_STOP),
    });
    yield put(Actions.tick( { light: true, ts: Date.now() }));
  } while (!result.stop)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield takeLatest(Types.TIMER_START, timer);
}
