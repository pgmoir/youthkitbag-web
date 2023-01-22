import {
  GETALL_SUCCESS,
  GET_USER,
  EDIT_USER,
  RESET_USER_FLAGS,
  API_USER_ERROR,
  RESET,
  RESET_TOAST
} from './types';
import axios from '../utils/axios';

export const getUser = () => (dispatch) => {
  axios
    .get(`/user`, {})
    .then((response) => {
      dispatch({ type: GETALL_SUCCESS });
      dispatch({ type: GET_USER, payload: response.data });
    })
    .catch(() => {});
};

export const editUser = (formValues) => (dispatch) => {
  axios
    .put('/user', { ...formValues }, {})
    .then((response) => {
      dispatch({ type: EDIT_USER, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_USER_ERROR, payload: response.data });
    });
};

export const deleteUser =
  ({ userId, formValues }) =>
  (dispatch) => {
    axios
      .put('/user/delete', { ...formValues, userId }, {})
      .then(() => {
        window.localStorage.clear();
        dispatch({ type: RESET });
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_USER_ERROR, payload: response.data });
      });
  };

export const editPreferredKitbag =
  ({ kitbagId }) =>
  (dispatch) => {
    axios
      .put(`/user/kitbag/${kitbagId}`, {}, {})
      .then((response) => {
        dispatch({ type: EDIT_USER, payload: response.data });
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_USER_ERROR, payload: response.data });
      });
  };

export const hideFlag = (name, hide) => (dispatch) => {
  axios
    .put(`/user/flag/hide`, { name, hide }, {})
    .then(() => {
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_USER_ERROR, payload: response.data });
    });
};

export const resetFlags = () => (dispatch) => {
  axios
    .put('/user/flags/reset', {}, {})
    .then((response) => {
      dispatch({ type: RESET_USER_FLAGS, payload: response.data });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_USER_ERROR, payload: response.data });
    });
};

export const loadSettingsPage = (url) => (dispatch) => {
  dispatch({ type: RESET_TOAST });
};
