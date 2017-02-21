import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Types from './types';
import * as Actions from './actions';
import rootSaga from './sagas';

export const reducer = (state = { lastUpdate: 0, light: false }, action) => {
  switch (action.type) {
  case Types.TICK: return { lastUpdate: action.payload.ts, light: !!action.payload.light };
  default: return state;
  }
}

//export const startClock = () => dispatch => {
//  return setInterval(() => dispatch(tick( {light: true, ts: Date.now() }));
//}

export const initStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
