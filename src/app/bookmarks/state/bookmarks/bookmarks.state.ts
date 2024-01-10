import { Bookmark } from '../../../../generated-types';

export interface BookmarksState {
  bookmarks: Bookmark[];
}

export const initialState: BookmarksState = {
  bookmarks: [],
};
