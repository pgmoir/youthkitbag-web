import axios from 'axios';
import { getHeaders, updateTokens } from '../helpers/ykbApi';
import {
  FETCH_MARKET_ITEMS,
  FETCH_MARKET_ITEM,
  API_MARKET_ERROR,
  GETALL_FAILURE,
  RESPOND_MARKET_ITEM,
  SEARCH_MARKET_ITEMS,
  RESET_TOAST,
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchMarketItems = (
  searchfor = '',
  by = '',
  page = 1,
  pagesize = 24,
  accountId,
  excgroups = false,
  excaccounts = false
) => (dispatch) => {
  axios
    .get(`${baseUrl}/market`, {
      params: { searchfor, by, page, pagesize, excgroups, excaccounts },
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_MARKET_ITEMS, payload: response.data });
      dispatch({
        type: SEARCH_MARKET_ITEMS,
        payload: { searchfor, by, page, pagesize, excgroups, excaccounts },
      });
      history.push(
        `/market?searchfor=${searchfor}&by=${by}&page=${page}&pagesize=${pagesize}&excgroups=${excgroups}&excaccounts=${excaccounts}`
      );
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market');
      }
      dispatch({ type: API_MARKET_ERROR, payload: response });
    });
};

export const fetchMarketItem = (marketId) => (dispatch) => {
  axios
    .get(`${baseUrl}/market/${marketId}`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_MARKET_ITEM, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market');
      }
      dispatch({ type: API_MARKET_ERROR, payload: err.response });
    });
};

export const respondMarketItem = (marketId, formValues) => (dispatch) => {
  axios
    .post(
      `${baseUrl}/market/respond/${marketId}`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/market/${marketId}`);
      dispatch({ type: RESET_TOAST });
      dispatch({ type: RESPOND_MARKET_ITEM, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${marketId}`);
      }
      dispatch({ type: API_MARKET_ERROR, payload: err.response });
    });
};

export const respondToMarketThread = (marketId, threadId, formValues) => (
  dispatch
) => {
  axios
    .put(
      `${baseUrl}/market/respond/${marketId}/${threadId}`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
    .then(() => {
      dispatch({ type: RESET_TOAST });
      dispatch(fetchMarketItem(marketId));
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${marketId}`);
      }
      dispatch({ type: API_MARKET_ERROR, payload: err.response });
    });
};
