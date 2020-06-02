import axios from '../utils/axios';
import {
  GETALL_SUCCESS,
  GET_USER,
  EDIT_USER_PROFILE,
  RESET_USER_FLAGS,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  RESET,
  RESET_TOAST,
} from './types';
import history from '../utils/history';

export const getUser = () => (dispatch) => {
  const userId = localStorage.getItem('user');

  axios
    .get(`/user/${userId}`, {})
    .then((response) => {
      const { data } = response;
      dispatch({ type: GETALL_SUCCESS });
      dispatch({ type: GET_USER, payload: data });
    })
    .catch(() => {});
};

export const editProfile = (userId, formValues) => (dispatch) => {
  axios
    .put(`/user/${userId}/profile`, { ...formValues }, {})
    .then((response) => {
      history.push('/settings/profile');
      dispatch({ type: EDIT_USER_PROFILE, payload: response.data });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/profile');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const deleteUser = (userId, formValues) => (dispatch) => {
  axios
    .put(`/user/${userId}/delete`, { ...formValues }, {})
    .then(() => {
      window.localStorage.clear();
      dispatch({ type: RESET });
      history.push('/auth/login?return=/settings/profile');
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/profile');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editProfilePreferredAccount = (userId, accountId) => (
  dispatch
) => {
  axios
    .put(`/user/${userId}/profile/account/${accountId}`, {}, {})
    .then((response) => {
      history.push('/settings/accounts');
      dispatch({ type: EDIT_USER_PROFILE, payload: response.data });
      dispatch({ type: RESET });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/accounts');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const hideFlag = (name, hide) => (dispatch) => {
  const userId = localStorage.getItem('user');
  axios
    .put(`/user/${userId}/flags/${name}/${hide}`, {}, {})
    .then(() => {
      dispatch({ type: RESET });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/accounts');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const resetFlags = () => (dispatch) => {
  const userId = localStorage.getItem('user');
  axios
    .put(`/user/${userId}/flags/reset`, {}, {})
    .then((response) => {
      dispatch({ type: RESET_USER_FLAGS, payload: response.data });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/accounts');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const loadSettingsPage = (url) => (dispatch) => {
  dispatch({ type: RESET_TOAST });
  history.push(url);
};
