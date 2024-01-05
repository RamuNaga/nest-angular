import { Bookmark } from '../../../generated-types';

export interface BookmarksState {
  bookmarks: Array<Bookmark> | [];
}

export const initialState: BookmarksState = {
  bookmarks: [],
};
