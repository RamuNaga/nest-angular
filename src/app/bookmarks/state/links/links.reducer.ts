import { Action, createReducer, on } from '@ngrx/store';
import { LinksState, initialState } from './links.state';
import { fetchLinksByUrlsSuccess } from './links.action';

const _linksReducer = createReducer(
  initialState,

  on(fetchLinksByUrlsSuccess, (state, action) => {
    return {
      ...state,
      links: action.links,
    };
  }),
);
export function LinksReducer(state: LinksState | undefined, action: Action) {
  return _linksReducer(state, action);
}
