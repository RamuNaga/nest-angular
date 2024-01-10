import { createAction, props } from '@ngrx/store';
import { Link } from '../../../../generated-types';

export const FETCH_LINKS_BY_URLS = '[links] fetch by urls.';
export const FETCH_LINKS_BY_URLS_SUCCESS = '[links] fetch by urls are success.';

export const fetchLinksByUrls = createAction(
  FETCH_LINKS_BY_URLS,
  props<{ urls: string[] }>(),
);

export const fetchLinksByUrlsSuccess = createAction(
  FETCH_LINKS_BY_URLS_SUCCESS,
  props<{ links: Link[] }>(),
);
