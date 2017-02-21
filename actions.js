import { createAction } from 'redux-actions';
import * as Types from './types';

export const tick = createAction(Types.TICK);
export const timerStart = createAction(Types.TIMER_START);
export const timerStop = createAction(Types.TIMER_STOP);
