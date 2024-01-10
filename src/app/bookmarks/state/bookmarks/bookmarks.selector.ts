import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.state';
import { getCurrentRoute } from '../../../store/router/router-selector';
import { RouterStateUrl } from '../../../store/router/custom-serializer';

export const BOOKMARK_STATE_NAME = 'bookmark';
const getBookmarksState =
  createFeatureSelector<BookmarksState>(BOOKMARK_STATE_NAME);

export const getBookmarks = createSelector(getBookmarksState, (state) => {
  return state.bookmarks;
});

export const getBookById = createSelector(
  getBookmarks,
  getCurrentRoute,
  (bookmarks, route: RouterStateUrl) => {
    return (
      bookmarks &&
      bookmarks.find((bookmark) => bookmark._id == route.params['id'])
    );
  },
);
