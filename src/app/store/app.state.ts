import { AuthReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { BookmarksReducer } from '../bookmarks/state/bookmarks.reducer';
import { BOOKMARK_STATE_NAME } from '../bookmarks/state/bookmarks.selector';
import { BookmarksState } from '../bookmarks/state/bookmarks.state';
import { SharedReducer } from './Shared/shared.reducer';
import { SHARED_STATE_NAME } from './Shared/shared.selector';
import { SharedState } from './Shared/shared.state';

export interface Appstate {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  [BOOKMARK_STATE_NAME]: BookmarksState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [BOOKMARK_STATE_NAME]: BookmarksReducer,
};
