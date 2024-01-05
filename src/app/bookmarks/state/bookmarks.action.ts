import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../../generated-types';

export const FETCH_BOOKMARKS = '[bookmarks] fetch';
export const FETCH_BOOKMARKS_SUCCESS = '[bookmarks] fetched successfully';

export const fetchBookmarks = createAction(FETCH_BOOKMARKS);

export const fetchBookmarksSuccess = createAction(
  FETCH_BOOKMARKS_SUCCESS,
  props<{ bookmarks: Array<Bookmark> }>(),
);
