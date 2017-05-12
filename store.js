// @flow
// See: http://blog.namiking.net/post/2016/05/react-redux-using-flow-example/

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import * as Types from './types';
import type { Action } from './actions';
import rootSaga from './sagas';

interface FollowBoxState {
  followers: { avatar_url: string }[],
  modal: {
    show: boolean,
    title: string,
    content: any
  },
  loading: boolean
}

const initialState: FollowBoxState = {
  followers: [{ avatar_url: '' }, { avatar_url: '' }, { avatar_url: '' }],
  modal: {
    show: false,
    title: 'Modal',
    content: null,
  },
  loading: false,
};

export const reducer = (state: FollowBoxState = initialState, action: Action) => {
  switch (action.type) {
    case Types.SET_FOLLOWER: {
      return {
        ...state,
        followers: [
          ...state.followers.slice(0, action.payload.idx),
          action.payload.user,
          ...state.followers.slice(
            action.payload.idx + 1,
            state.followers.length
          ),
        ],
      };
    }
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
    default:
      return state;
  }
};

export const initStore = (init: FollowBoxState) => {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  const store = createStore(
    reducer,
    init,
    applyMiddleware(sagaMiddleware, logger)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
