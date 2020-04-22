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
import axios from 'axios';
import { getHeaders, updateTokens } from '../helpers/ykbApi';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const getUser = () => (dispatch) => {
  const userId = localStorage.getItem('user');

  axios
    .get(`${baseUrl}/user/${userId}`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      const { data } = response;
      dispatch({ type: GETALL_SUCCESS });
      dispatch({ type: GET_USER, payload: data });
    })
    .catch(() => {});
};

export const editProfile = (userId, formValues) => (dispatch) => {
  axios
    .put(
      `${baseUrl}/user/${userId}/profile`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
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
    .put(
      `${baseUrl}/user/${userId}/delete`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
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
    .put(
      `${baseUrl}/user/${userId}/profile/account/${accountId}`,
      {},
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
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
    .put(
      `${baseUrl}/user/${userId}/flags/${name}/${hide}`,
      {},
      {
        headers: getHeaders(),
      }
    )
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
    .put(
      `${baseUrl}/user/${userId}/flags/reset`,
      {},
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
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
