import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.state';

export const BOOKMARK_STATE_NAME = 'bookmark';
const getBookmarksState =
  createFeatureSelector<BookmarksState>(BOOKMARK_STATE_NAME);

export const getBookmarks = createSelector(getBookmarksState, (state) => {
  return state.bookmarks;
});
