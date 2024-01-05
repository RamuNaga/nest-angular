import { Action, createReducer, on } from '@ngrx/store';
import { SharedState, initialState } from './shared.state';
import {
  setDialogPopup,
  setErrorMessage,
  setLoadingSpinner,
} from './shared.action';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setDialogPopup, (state, action) => {
    return {
      ...state,
      showDialog: action.showDialog,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: { message: action.message },
    };
  }),
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
