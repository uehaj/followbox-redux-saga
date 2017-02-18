import { delay } from 'redux-saga';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function myDelay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// Our worker Saga: will perform the async increment task
export function* loop1() {
  let i = 0;
  while (true) {
    i = yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i+1);
      }, 1000);
    });
    console.log(i);
  }
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield myDelay();
  yield put({ type: 'INCREMENT' });
}

// Our worker Saga: will perform the async increment task
export function* loop2() {
  let i = 0;
  while (true) {
    yield delay(1000);
    console.log(i++);
  }
}

// Our worker Saga: will perform the async increment task
export function* loop3() {
  let i = 0;
  while (yield new Promise(resolve => setTimeout(()=>resolve(++i), 1000)) < 10) {
    console.log(i);
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* watchLoop1() {
  yield takeLatest('LOOP1', loop1);
}

export function* watchLoop2() {
  yield takeEvery('LOOP2', loop2);
}

export function* watchLoop3() {
  yield takeEvery('LOOP3', loop3);
}

export function* helloSaga() {
  console.log('Hello Sagas!');
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    helloSaga(),
    // watchIncrementAsync(),
    // watchLoop1(),
    // watchLoop2(),
    // watchLoop3()
  ]
}
