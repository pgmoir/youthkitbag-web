import { RESET_TOAST } from './types';

export const resetToast = () => dispatch => {
  dispatch({ type: RESET_TOAST });
};
