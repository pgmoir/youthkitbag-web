import axios from 'axios';
import {
  CREATE_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  FETCH_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  DELETE_KITBAG_KIT,
  API_KITBAG_ERROR,
  GETALL_FAILURE
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchKitbagKits = (
  search = '',
  by = 'all',
  page = 1,
  pagesize = 24,
  accountId = null
) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/kitbag/kit/${accountId}`, {
      params: { search, by, page, pagesize },
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_KITBAG_KITS, payload: response.data });
      history.push(
        `/kitbag/kit/${accountId}?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`
      );
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const fetchKitbagKit = (accountId, kitId) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/kitbag/kit/${accountId}/${kitId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_KITBAG_KIT, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createKitbagKit = (accountId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/kitbag/kit/${accountId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: CREATE_KITBAG_KIT, payload: response.data });
      history.push(`/kitbag/kit/${accountId}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editKitbagKit = (accountId, kitId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/kitbag/kit/${accountId}/${kitId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: EDIT_KITBAG_KIT, payload: response.data });
      history.push(`/kitbag/kit/${accountId}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const deleteKitbagKit = (accountId, kitId) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .delete(`${baseUrl}/kitbag/kit/${accountId}/${kitId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: DELETE_KITBAG_KIT, payload: response.data });
      history.push(`/kitbag/kit/${accountId}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
