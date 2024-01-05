import { User } from '../../../generated-types';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};
