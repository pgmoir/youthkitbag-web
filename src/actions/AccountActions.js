import axios from 'axios';
import {
  CLEAR_ACCOUNT,
  FETCH_ACCOUNT,
  EDIT_ACCOUNT_STATUS,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  CREATE_ACCOUNT_INVITE,
  EDIT_ACCOUNT_LEAVE
} from './types';
import history from '../helpers/history';
import { getUser } from './UserActions';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchAccount = accountId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/account/${accountId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_ACCOUNT, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/accounts/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createAccount = formValues => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/account`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(() => {
      history.push('/settings/accounts');
      dispatch({ type: CLEAR_ACCOUNT });
      dispatch(getUser());
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/accounts');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editAccount = (accountId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/account/${accountId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(() => {
      history.push('/settings/accounts');
      dispatch({ type: CLEAR_ACCOUNT });
      dispatch(getUser());
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/accounts');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editAccountStatus = (accountId, status) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/account/${accountId}/status`,
      { status: status },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      history.push('/settings/accounts');
      dispatch({ type: EDIT_ACCOUNT_STATUS, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/accounts');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const inviteToAccount = (accountId, email) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/account/${accountId}/member/invite/${email}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      history.push(`/settings/accounts`);
      dispatch({ type: CREATE_ACCOUNT_INVITE, payload: response.data });
    })
    .catch(err => {
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

export const requestToJoinAccount = email => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/account/requesttojoin/${email}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(() => {
      history.push(`/`);
    })
    .catch(err => {
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

export const requestAccountLeave = accountId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/account/${accountId}/members/leave`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      history.push(`/settings/accounts`);
      dispatch({ type: EDIT_ACCOUNT_LEAVE, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/settings/accounts`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const clearAccount = () => dispatch => {
  dispatch({ type: CLEAR_ACCOUNT });
};
