import { Link } from '../../../../generated-types';

export interface LinksState {
  links: Link[];
}

export const initialState: LinksState = {
  links: [],
};
