import { Action, createReducer, on } from '@ngrx/store';
import { BookmarksState, initialState } from './bookmarks.state';
import { fetchBookmarksSuccess } from './bookmarks.action';

const _bookmarksReducer = createReducer(
  initialState,
  on(fetchBookmarksSuccess, (state, action) => {
    return {
      ...state,
      bookmarks: action.bookmarks,
    };
  }),
);
export function BookmarksReducer(
  state: BookmarksState | undefined,
  action: Action,
) {
  return _bookmarksReducer(state, action);
}
