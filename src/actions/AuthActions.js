import axios from '../utils/axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_ERROR,
  LOGOUT,
  RESET_REQUESTED,
  SIGNUP_FAILURE,
  PASSWORD_RESET_CHECK,
  PASSWORD_RESET,
} from './types';
import history from '../utils/history';
import { getUser } from './UserActions';

export const login = (email, password, referrer) => (dispatch) => {
  window.localStorage.clear();
  axios
    .post(
      `/auth/login`,
      { email, password },
      {
        'content-type': 'application/json',
      }
    )
    .then((response) => {
      const { data } = response;
      localStorage.setItem('authToken', data.data.authToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', data.data.userId);
      localStorage.setItem('isloggedin', true);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(getUser());
      history.push(referrer ? referrer : '/');
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: LOGIN_FAILURE, payload: response.data.data });
    });
};

export const authenticateToken = (token) => (dispatch) => {
  window.localStorage.clear();
  axios
    .post(
      `/auth/authenticate`,
      { token },
      {
        'content-type': 'application/json',
      }
    )
    .then((response) => {
      const { data } = response;
      localStorage.setItem('authToken', data.data.authToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', data.data.userId);
      localStorage.setItem('isloggedin', true);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(getUser());
      history.push('/');
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: LOGIN_FAILURE, payload: response.data.data });
      history.push('/');
    });
};

export const signup = (formValues) => (dispatch) => {
  window.localStorage.clear();
  const { kitbagId } = formValues;
  const signupUrl = kitbagId ? `/auth/signup/${kitbagId}` : 'auth/signup';
  axios
    .post(signupUrl, { ...formValues }, {})
    .then((response) => {
      const { data } = response;
      localStorage.setItem('authToken', data.data.authToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', data.data.userId);
      localStorage.setItem('isloggedin', true);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(getUser());
      history.push('/');
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: SIGNUP_FAILURE, payload: response.data });
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
      `/auth/reset`,
      { email },
      {
        'content-type': 'application/json',
      }
    )
    .then((response) => {
      history.push('/auth/login');
      dispatch({ type: RESET_REQUESTED, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: SIGNUP_FAILURE, payload: response.data });
      dispatch({ type: SET_ERROR, payload: response.data });
    });
};

export const checkNewPassword = (token) => (dispatch) => {
  window.localStorage.clear();
  axios
    .get(`/auth/reset/${token}`)
    .then((response) => {
      dispatch({ type: PASSWORD_RESET_CHECK, payload: response.data.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: SIGNUP_FAILURE, payload: response.data });
    });
};

export const setNewPassword = (
  userId,
  passwordToken,
  password,
  confirmPassword
) => (dispatch) => {
  window.localStorage.clear();
  axios
    .post(
      `/auth/new-password`,
      { userId, passwordToken, password, confirmPassword },
      {
        'content-type': 'application/json',
      }
    )
    .then((response) => {
      history.push('/auth/login');
      dispatch({ type: PASSWORD_RESET, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: SIGNUP_FAILURE, payload: response.data.data });
    });
};
