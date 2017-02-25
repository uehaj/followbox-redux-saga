import { createAction } from 'redux-actions';
import * as Types from './types';

export const refresh = createAction(Types.USER_REFRESH);
export const close = createAction(Types.USER_CLOSE);
export const setFollower = createAction(Types.SET_FOLLOWER);
