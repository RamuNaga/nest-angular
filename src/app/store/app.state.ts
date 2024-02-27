import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { AuthReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { SharedReducer } from './Shared/shared.reducer';
import { SHARED_STATE_NAME } from './Shared/shared.selector';
import { SharedState } from './Shared/shared.state';
import { BOOKMARK_STATE_NAME } from '../bookmarks/state/bookmarks/bookmarks.selector';
import { BookmarksReducer } from '../bookmarks/state/bookmarks/bookmarks.reducer';
import { BookmarksState } from '../bookmarks/state/bookmarks/bookmarks.state';
import { LINK_STATE_NAME } from '../bookmarks/state/links/links.selector';
import { LinksState } from '../bookmarks/state/links/links.state';
import { LinksReducer } from '../bookmarks/state/links/links.reducer';
import {
  PRODUCT_FEATURE_KEY,
  ProductsState,
  productsReducer,
} from '../shoppingcart/state/products.reducer';

export interface Appstate {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  [BOOKMARK_STATE_NAME]: BookmarksState;
  [LINK_STATE_NAME]: LinksState;
  [PRODUCT_FEATURE_KEY]: ProductsState;
  router: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [BOOKMARK_STATE_NAME]: BookmarksReducer,
  [LINK_STATE_NAME]: LinksReducer,
  [PRODUCT_FEATURE_KEY]: productsReducer,
  router: routerReducer,
};
