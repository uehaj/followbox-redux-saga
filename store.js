import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import * as Types from './types';
import rootSaga from './sagas';

const initialState = {
  followers: [
    { avatar_url: '' },
    { avatar_url: '' },
    { avatar_url: '' },
  ],
  modal: {
    show: false,
    title: 'Modal',
    content: null,
  },
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case Types.SET_FOLLOWER: {
    return {
      ...state,
      followers: [
        ...state.followers.slice(0, action.payload.idx),
        action.payload.user,
        ...state.followers.slice(action.payload.idx+1, state.followers.length)
      ],
    };
  };
  case Types.SET_MODAL: {
    return {
      ...state,
      modal: action.payload,
    };
  }
  case Types.SET_LOADING: {
    return {
      ...state,
      loading: action.payload,
    };
  }
  default: return state;
  }
};

export const initStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware, logger));
  sagaMiddleware.run(rootSaga);
  return store;
}
