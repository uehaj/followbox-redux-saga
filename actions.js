import { createAction } from 'redux-actions';
import * as Types from './types';

export const refresh = createAction(Types.UI_REFRESH);
export const remove = createAction(Types.UI_REMOVE);
export const uiModalOpen = createAction(Types.UI_MODAL_OPEN);
export const uiModalOk = createAction(Types.UI_MODAL_OK);
export const uiModalCancel = createAction(Types.UI_MODAL_CANCEL);

export const setFollower = createAction(Types.SET_FOLLOWER);
export const setModal = createAction(Types.SET_MODAL);
export const setLoading = createAction(Types.SET_LOADING);
