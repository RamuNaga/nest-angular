import { MessageModel } from '../../model/message';

export interface SharedState {
  showLoading: boolean;
  errorMessage: MessageModel;
  showDialog: boolean;
}

export const initialState: SharedState = {
  showLoading: false,
  showDialog: false,
  errorMessage: { message: '' },
};
