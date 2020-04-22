import axios from 'axios';
import { getHeaders, updateTokens } from '../helpers/ykbApi';
import {
  CREATE_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  FETCH_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  DELETE_KITBAG_KIT,
  API_KITBAG_ERROR,
  FETCH_KITBAG_LISTS,
  GETALL_FAILURE,
  SEARCH_KITBAG_KITS,
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchKitbagKits = (
  searchfor = '',
  by = '',
  page = 1,
  pagesize = 24,
  accountId = null
) => (dispatch) => {
  axios
    .get(`${baseUrl}/kitbag/kit/${accountId}`, {
      params: { searchfor, by, page, pagesize },
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_KITBAG_KITS, payload: response.data });
      dispatch({
        type: SEARCH_KITBAG_KITS,
        payload: { searchfor, by, page, pagesize },
      });
      history.push(
        `/kitbag/kit/${accountId}?searchfor=${searchfor}&by=${by}&page=${page}&pagesize=${pagesize}`
      );
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const fetchKitbagKit = (accountId, kitId) => (dispatch) => {
  axios
    .get(`${baseUrl}/kitbag/kit/${accountId}/${kitId}`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createKitbagKit = (accountId, formValues) => (dispatch) => {
  axios
    .post(
      `${baseUrl}/kitbag/kit/${accountId}`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/kitbag/kit/${accountId}`);
      dispatch({ type: CREATE_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editKitbagKit = (accountId, kitId, formValues) => (dispatch) => {
  axios
    .put(
      `${baseUrl}/kitbag/kit/${accountId}/${kitId}`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/kitbag/kit/${accountId}`);
      dispatch({ type: EDIT_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const deleteKitbagKit = (accountId, kitId) => (dispatch) => {
  axios
    .delete(`${baseUrl}/kitbag/kit/${accountId}/${kitId}`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/kitbag/kit/${accountId}`);
      dispatch({ type: DELETE_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchKitbagLists = (accountId = null) => (dispatch) => {
  axios
    .get(`${baseUrl}/kitbag/kit/${accountId}/lists`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_KITBAG_LISTS, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};
