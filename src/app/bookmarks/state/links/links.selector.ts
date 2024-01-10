import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LinksState } from './links.state';

export const LINK_STATE_NAME = 'link';
const getLinkState = createFeatureSelector<LinksState>(LINK_STATE_NAME);
export const getLinks = createSelector(getLinkState, (state) => {
  return state.links;
});
