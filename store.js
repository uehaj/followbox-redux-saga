import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export const reducer = (state = { lastUpdate: 0, light: false }, action) => {
  switch (action.type) {
  case 'TICK': return { lastUpdate: action.ts, light: !!action.light };
  default: return state;
  }
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({ type: 'TICK', light: true, ts: Date.now() }), 800);
}

export const initStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
