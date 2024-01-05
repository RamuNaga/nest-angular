import { createAction, props } from '@ngrx/store';
import { CreateUserInput, User } from '../../../generated-types';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGIN_FAIL = '[auth page] login Fail';

export const loginStart = createAction(LOGIN_START, props<CreateUserInput>());

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; redirect: boolean }>(),
);
