import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Types from './types';
import rootSaga from './sagas';

const FOLLOWERS = 10;

export const reducer = (state = { followers: [null, null, null] }, action) => {
  console.log('1=>',action);
  switch (action.type) {
  case Types.SET_FOLLOWER: {
    let tmp = [].concat(state.followers);
    tmp[action.payload.idx] = action.payload.follower;
    return tmp;
  };
  default: return state;
  }
};

export const initStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
