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

export const fetchKitbagMarketItems = ({
  by,
  searchfor,
  page,
  pagesize,
  order,
  direction,
}) => (dispatch) => {
  axios
    .get(`/kitbag/market`, {
      params: { by, searchfor, page, pagesize, order, direction },
    })
    .then((response) => {
      switch (by) {
        case 'trade':
          dispatch({
            type: FETCH_KITBAG_MARKET_TRADES,
            payload: response.data.data,
          });
          break;
        case 'recycle':
          dispatch({
            type: FETCH_KITBAG_MARKET_RECYCLES,
            payload: response.data.data,
          });
          break;
        case 'found':
          dispatch({
            type: FETCH_KITBAG_MARKET_FOUNDS,
            payload: response.data.data,
          });
          break;
        case 'lost':
          dispatch({
            type: FETCH_KITBAG_MARKET_LOSTS,
            payload: response.data.data,
          });
          break;
        case 'stolen':
          dispatch({
            type: FETCH_KITBAG_MARKET_STOLENS,
            payload: response.data.data,
          });
          break;
        case 'wanted':
          dispatch({
            type: FETCH_KITBAG_MARKET_WANTEDS,
            payload: response.data.data,
          });
          break;
        default:
          dispatch({
            type: FETCH_KITBAG_MARKET_ITEMS,
            payload: response.data.data,
          });
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
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const fetchMarketKit = (kitbagId, marketId) => (dispatch) => {
  axios
    .get(`/kitbag/market/${kitbagId}/${marketId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push(`/auth/login?return=/market`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const fetchMarketKitFromKit = (kitbagId, kitId, marketType) => (
  dispatch
) => {
  axios
    .get(`/kitbag/market/${kitbagId}/add/${kitId}/${marketType}`, {})
    .then((response) => {
      dispatch({ type: FETCH_MARKET_KIT, payload: response.data.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push(`/auth/login?return=/market/${kitbagId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const createMarketKit = (kitbagId, formValues) => (dispatch) => {
  axios
    .post(`/kitbag/market/${kitbagId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/market/${kitbagId}`);
      dispatch({ type: CREATE_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push(`/auth/login?return=/market/${kitbagId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const editMarketKit = (kitbagId, marketId, formValues) => (dispatch) => {
  axios
    .put(`/kitbag/market/${kitbagId}/${marketId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/market/${kitbagId}`);
      dispatch({ type: EDIT_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push('/auth/login?return=/market');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const respondToMarketKitThread = (
  kitbagId,
  marketId,
  threadId,
  formValues
) => (dispatch) => {
  axios
    .put(
      `/kitbag/market/${kitbagId}/respond/${marketId}/${threadId}`,
      { ...formValues },
      {}
    )
    .then(() => {
      dispatch({ type: RESET_TOAST });
      dispatch(fetchMarketKit(kitbagId, marketId));
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push(
          `/auth/login?return=/kitbag/market/${kitbagId}/edit/${marketId}`
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const deleteMarketKit = (kitbagId, marketId) => (dispatch) => {
  axios
    .delete(`/kitbag/market/${kitbagId}/${marketId}`, {})
    .then((response) => {
      history.push(`/market/${kitbagId}`);
      dispatch({ type: DELETE_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push(`/auth/login?return=/market/${kitbagId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};
