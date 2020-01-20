import axios from 'axios';
import {
  CREATE_MARKET_KIT,
  FETCH_MARKET_KIT,
  EDIT_MARKET_KIT,
  DELETE_MARKET_KIT,
  API_KITBAG_ERROR,
  GETALL_FAILURE
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchMarketKit = (accountId, marketId) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/kitbag/market/${accountId}/${marketId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_MARKET_KIT, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchMarketKitFromKit = (
  accountId,
  kitId,
  marketType
) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/kitbag/market/${accountId}/add/${kitId}/${marketType}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_MARKET_KIT, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createMarketKit = (accountId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/kitbag/market/${accountId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: CREATE_MARKET_KIT, payload: response.data });
      history.push(`/market/${accountId}?searchfor=&by=&page=1&pagesize=24`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          `/auth/login?return=/market/${accountId}?searchfor=&by=&page=1&pagesize=24`
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editMarketKit = (accountId, marketId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/kitbag/market/${accountId}/${marketId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: EDIT_MARKET_KIT, payload: response.data });
      history.push(`/market/${accountId}?searchfor=&by=&page=1&pagesize=24`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          '/auth/login?return=/market?searchfor=&by=&page=1&pagesize=24'
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const respondToMarketKitThread = (
  accountId,
  marketId,
  threadId,
  formValues
) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/kitbag/market/${accountId}/respond/${marketId}/${threadId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(() => {
      dispatch(fetchMarketKit(accountId, marketId));
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          `/auth/login?return=/kitbag/market/${accountId}/edit/${marketId}`
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const deleteMarketKit = (accountId, marketId) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .delete(`${baseUrl}/kitbag/market/${accountId}/${marketId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: DELETE_MARKET_KIT, payload: response.data });
      history.push(`/market/${accountId}?searchfor=&by=&page=1&pagesize=24`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          `/auth/login?return=/market/${accountId}?searchfor=&by=&page=1&pagesize=24`
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
