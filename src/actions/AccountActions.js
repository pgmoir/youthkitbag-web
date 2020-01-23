import axios from 'axios';
import {
  CREATE_ACCOUNT,
  FETCH_ACCOUNT,
  EDIT_ACCOUNT,
  EDIT_ACCOUNT_STATUS,
  FETCH_ACCOUNT_MEMBERS,
  EDIT_ACCOUNT_MEMBER_STATE,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  CREATE_ACCOUNT_JOIN,
  EDIT_ACCOUNT_LEAVE
} from './types';
import history from '../helpers/history';
import { getUser } from './UserActions';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchAccount = accountId => dispatch => {
  console.log('ACCOUNTFETCH', accountId);
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
    .then(response => {
      dispatch({ type: CREATE_ACCOUNT, payload: response.data });
      dispatch(getUser());
      history.push('/accounts?searchfor=&by=&page=1&pagesize=24');
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          '/auth/login?return=/accounts?searchfor=&by=&page=1&pagesize=24'
        );
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
    .then(response => {
      dispatch({ type: EDIT_ACCOUNT, payload: response.data });
      history.push('/accounts?searchfor=&by=&page=1&pagesize=24');
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          '/auth/login?return=/accounts?searchfor=&by=&page=1&pagesize=24'
        );
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
      dispatch({ type: EDIT_ACCOUNT_STATUS, payload: response.data });
      history.push('/accounts?searchfor=&by=&page=1&pagesize=24');
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          '/auth/login?return=/accounts?searchfor=&by=&page=1&pagesize=24'
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchAccountMembers = accountId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/account/${accountId}/members`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_ACCOUNT_MEMBERS, payload: response.data });
      history.push(`/accounts/${accountId}/members`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/accounts/${accountId}/members`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const editAccountMemberState = (
  accountId,
  memberId,
  state
) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/account/${accountId}/members/${memberId}/${state}`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: EDIT_ACCOUNT_MEMBER_STATE, payload: response.data });
      history.push(`/accounts/${accountId}/members`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/accounts/${accountId}/members`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const requestAccountJoin = accountId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/account/${accountId}/members/join`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: CREATE_ACCOUNT_JOIN, payload: response.data });
      dispatch(getUser());
      history.push(`/accounts/${accountId}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/accounts/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
      history.push(`/accounts/${accountId}`);
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
      dispatch({ type: EDIT_ACCOUNT_LEAVE, payload: response.data });
      history.push(`/accounts/${accountId}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/accounts/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
