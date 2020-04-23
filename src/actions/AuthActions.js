import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT,
  RESET_REQUESTED,
  SIGNUP_FAILURE,
  PASSWORD_RESET_CHECK,
  PASSWORD_RESET,
} from './types';
import axios from 'axios';
import history from '../helpers/history';
import { getUser } from './UserActions';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const login = (email, password, referrer) => (dispatch) => {
  window.localStorage.clear();
  axios
    .post(
      `${baseUrl}/auth/login`,
      { email, password },
      {
        'content-type': 'application/json',
      }
    )
    .then((response) => {
      const { data } = response;
      localStorage.setItem('auth-token', data.authToken);
      localStorage.setItem('refresh-token', data.refreshToken);
      localStorage.setItem('user', data.userId);
      localStorage.setItem('isloggedin', true);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(getUser());
      history.push(referrer ? referrer : '/');
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response });
    });
};

export const authenticateToken = (token) => (dispatch) => {
  window.localStorage.clear();
  axios
    .post(
      `${baseUrl}/auth/authenticate`,
      { token },
      {
        'content-type': 'application/json',
      }
    )
    .then((response) => {
      const { data } = response;
      localStorage.setItem('auth-token', data.authToken);
      localStorage.setItem('refresh-token', data.refreshToken);
      localStorage.setItem('user', data.userId);
      localStorage.setItem('isloggedin', true);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(getUser());
      history.push('/');
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response });
    });
};

export const signup = (email, password, confirmPassword) => (dispatch) => {
  window.localStorage.clear();
  axios
    .post(
      `${baseUrl}/auth/signup`,
      { email, password, confirmPassword },
      {
        'content-type': 'application/json',
      }
    )
    .then((response) => {
      history.push('/auth/login', { signup: 'success' });
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: SIGNUP_FAILURE, payload: err.response });
    });
};

export const logout = () => async (dispatch) => {
  try {
    window.localStorage.clear();
    dispatch({ type: LOGOUT });
    history.push('/');
  } catch (err) {
    if (err.response.status === 401) {
      history.push('/');
    }
  }
};

export const reset = (email) => (dispatch) => {
  window.localStorage.clear();
  axios
    .post(
      `${baseUrl}/auth/reset`,
      { email },
      {
        'content-type': 'application/json',
      }
    )
    .then(() => {
      dispatch({ type: RESET_REQUESTED });
      history.push('/auth/login');
    })
    .catch((err) => {
      dispatch({ type: SIGNUP_FAILURE, payload: err.response });
      dispatch({ type: SET_ERROR, payload: err.response });
    });
};

export const checkNewPassword = (token) => (dispatch) => {
  window.localStorage.clear();
  axios
    .get(`${baseUrl}/auth/reset/${token}`)
    .then((response) => {
      dispatch({ type: PASSWORD_RESET_CHECK, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: SIGNUP_FAILURE, payload: err.response });
    });
};

export const setNewPassword = (userId, passwordToken, password) => (
  dispatch
) => {
  window.localStorage.clear();
  axios
    .post(
      `${baseUrl}/auth/new-password`,
      { userId, passwordToken, password },
      {
        'content-type': 'application/json',
      }
    )
    .then(() => {
      dispatch({ type: PASSWORD_RESET });
      history.push('/auth/login');
    })
    .catch((err) => {
      dispatch({ type: SIGNUP_FAILURE, payload: err.response });
    });
};
