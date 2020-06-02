import axios from '../utils/axios';
import {
  CLEAR_ACCOUNT,
  FETCH_ACCOUNT,
  EDIT_ACCOUNT_STATUS,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  CREATE_ACCOUNT_INVITE,
  EDIT_ACCOUNT_LEAVE,
} from './types';
import history from '../utils/history';
import { getUser } from './UserActions';

export const fetchAccount = (accountId) => (dispatch) => {
  axios
    .get(`/account/${accountId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_ACCOUNT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/accounts/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createAccount = (formValues) => (dispatch) => {
  axios
    .post(`/account`, { ...formValues }, {})
    .then(() => {
      history.push('/settings/accounts');
      dispatch({ type: CLEAR_ACCOUNT });
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

export const editAccount = (accountId, formValues) => (dispatch) => {
  axios
    .put(`/account/${accountId}`, { ...formValues }, {})
    .then(() => {
      history.push('/settings/accounts');
      dispatch({ type: CLEAR_ACCOUNT });
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

export const editAccountStatus = (accountId, status) => (dispatch) => {
  axios
    .put(`/account/${accountId}/status`, { status: status }, {})
    .then((response) => {
      history.push('/settings/accounts');
      dispatch({ type: EDIT_ACCOUNT_STATUS, payload: response.data });
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

export const inviteToAccount = (accountId, email) => (dispatch) => {
  axios
    .put(`/account/${accountId}/member/invite/${email}`, {}, {})
    .then((response) => {
      history.push(`/settings/accounts`);
      dispatch({ type: CREATE_ACCOUNT_INVITE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/accounts/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
      history.push(`/settings/accounts`);
    });
};

export const requestToJoinAccount = (email) => (dispatch) => {
  axios
    .post(`/account/requesttojoin/${email}`, {}, {})
    .then(() => {
      history.push(`/`);
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
      history.push(`/`);
    });
};

export const requestAccountLeave = (accountId) => (dispatch) => {
  axios
    .put(`/account/${accountId}/members/leave`, {}, {})
    .then((response) => {
      history.push(`/settings/accounts`);
      dispatch({ type: EDIT_ACCOUNT_LEAVE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/settings/accounts`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const clearAccount = () => (dispatch) => {
  dispatch({ type: CLEAR_ACCOUNT });
};
