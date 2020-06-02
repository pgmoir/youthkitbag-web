import axios from '../utils/axios';
import {
  CREATE_MARKET_KIT,
  FETCH_MARKET_KIT,
  EDIT_MARKET_KIT,
  DELETE_MARKET_KIT,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  RESET_TOAST,
  FETCH_KITBAG_MARKET_ITEMS,
  FETCH_KITBAG_MARKET_TRADES,
  FETCH_KITBAG_MARKET_RECYCLES,
  FETCH_KITBAG_MARKET_FOUNDS,
  FETCH_KITBAG_MARKET_LOSTS,
  FETCH_KITBAG_MARKET_STOLENS,
  FETCH_KITBAG_MARKET_WANTEDS,
} from './types';
import history from '../utils/history';

export const fetchMarketKit = (accountId, marketId) => (dispatch) => {
  axios
    .get(`/kitbag/market/${accountId}/${marketId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchMarketKitFromKit = (accountId, kitId, marketType) => (
  dispatch
) => {
  axios
    .get(`/kitbag/market/${accountId}/add/${kitId}/${marketType}`, {})
    .then((response) => {
      dispatch({ type: FETCH_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createMarketKit = (accountId, formValues) => (dispatch) => {
  axios
    .post(`/kitbag/market/${accountId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/market/${accountId}`);
      dispatch({ type: CREATE_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editMarketKit = (accountId, marketId, formValues) => (
  dispatch
) => {
  axios
    .put(`/kitbag/market/${accountId}/${marketId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/market/${accountId}`);
      dispatch({ type: EDIT_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const respondToMarketKitThread = (
  accountId,
  marketId,
  threadId,
  formValues
) => (dispatch) => {
  axios
    .put(
      `/kitbag/market/${accountId}/respond/${marketId}/${threadId}`,
      { ...formValues },
      {}
    )
    .then(() => {
      dispatch({ type: RESET_TOAST });
      dispatch(fetchMarketKit(accountId, marketId));
    })
    .catch((err) => {
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

export const deleteMarketKit = (accountId, marketId) => (dispatch) => {
  axios
    .delete(`/kitbag/market/${accountId}/${marketId}`, {})
    .then((response) => {
      history.push(`/market/${accountId}`);
      dispatch({ type: DELETE_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchKitbagMarketItems = (by, pagesize) => (dispatch) => {
  axios
    .get(`/kitbag/market?by=${by}&pagesize=${pagesize}`, {})
    .then((response) => {
      switch (by) {
        case 'trade':
          dispatch({
            type: FETCH_KITBAG_MARKET_TRADES,
            payload: response.data,
          });
          break;
        case 'recycle':
          dispatch({
            type: FETCH_KITBAG_MARKET_RECYCLES,
            payload: response.data,
          });
          break;
        case 'found':
          dispatch({
            type: FETCH_KITBAG_MARKET_FOUNDS,
            payload: response.data,
          });
          break;
        case 'lost':
          dispatch({
            type: FETCH_KITBAG_MARKET_LOSTS,
            payload: response.data,
          });
          break;
        case 'stolen':
          dispatch({
            type: FETCH_KITBAG_MARKET_STOLENS,
            payload: response.data,
          });
          break;
        case 'wanted':
          dispatch({
            type: FETCH_KITBAG_MARKET_WANTEDS,
            payload: response.data,
          });
          break;
        default:
          dispatch({ type: FETCH_KITBAG_MARKET_ITEMS, payload: response.data });
          break;
      }
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};
