import axios from '../utils/axios';
import {
  CREATE_MARKET_KIT,
  FETCH_MARKET_KIT,
  EDIT_MARKET_KIT,
  DELETE_MARKET_KIT,
  API_ERROR,
  RESET_TOAST,
  FETCH_KITBAG_MARKET_ITEMS,
  FETCH_KITBAG_MARKET_TRADES,
  FETCH_KITBAG_MARKET_RECYCLES,
  FETCH_KITBAG_MARKET_FOUNDS,
  FETCH_KITBAG_MARKET_LOSTS,
  FETCH_KITBAG_MARKET_STOLENS,
  FETCH_KITBAG_MARKET_WANTEDS,
} from './types';
import { redirect } from 'react-router-dom';
import { MarketTypes } from '../enums/marketTypes.enum';

export const fetchKitbagMarketItems =
  ({ by, searchFor, page, pagesize, order = 'updatedAt', direction = -1 }) =>
  (dispatch) => {
    axios
      .get(`/kitbag/market`, {
        params: { by, searchFor, page, pagesize, order, direction },
      })
      .then((response) => {
        switch (by) {
          case MarketTypes.TRADE:
            dispatch({
              type: FETCH_KITBAG_MARKET_TRADES,
              payload: response.data,
            });
            break;
          case MarketTypes.RECYCLE:
            dispatch({
              type: FETCH_KITBAG_MARKET_RECYCLES,
              payload: response.data,
            });
            break;
          case MarketTypes.FOUND:
            dispatch({
              type: FETCH_KITBAG_MARKET_FOUNDS,
              payload: response.data,
            });
            break;
          case MarketTypes.LOST:
            dispatch({
              type: FETCH_KITBAG_MARKET_LOSTS,
              payload: response.data,
            });
            break;
          case MarketTypes.STOLEN:
            dispatch({
              type: FETCH_KITBAG_MARKET_STOLENS,
              payload: response.data,
            });
            break;
          case MarketTypes.WANTED:
            dispatch({
              type: FETCH_KITBAG_MARKET_WANTEDS,
              payload: response.data,
            });
            break;
          default:
            dispatch({
              type: FETCH_KITBAG_MARKET_ITEMS,
              payload: response.data,
            });
            break;
        }
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_ERROR, payload: response.data });
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
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const fetchMarketKitFromKit =
  (kitbagId, kitId, marketType) => (dispatch) => {
    axios
      .get(`/kitbag/market/${kitbagId}/add/${kitId}/${marketType}`, {})
      .then((response) => {
        dispatch({ type: FETCH_MARKET_KIT, payload: response.data });
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_ERROR, payload: response.data });
      });
  };

export const createMarketKit = (kitbagId, formValues) => (dispatch) => {
  axios
    .post(`/kitbag/market/${kitbagId}`, { ...formValues }, {})
    .then((response) => {
      return redirect(`/market/${kitbagId}`);
      dispatch({ type: CREATE_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const editMarketKit = (kitbagId, marketId, formValues) => (dispatch) => {
  axios
    .put(`/kitbag/market/${kitbagId}/${marketId}`, { ...formValues }, {})
    .then((response) => {
      return redirect(`/market/${kitbagId}`);
      dispatch({ type: EDIT_MARKET_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const respondToMarketKitThread =
  (kitbagId, marketId, threadId, formValues) => (dispatch) => {
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
        dispatch({ type: API_ERROR, payload: response.data });
      });
  };

export const deleteMarketKit = (kitbagId, marketId) => (dispatch) => {
  axios
    .delete(`/kitbag/market/${kitbagId}/${marketId}`, {})
    .then(() => {
      dispatch({ type: DELETE_MARKET_KIT, payload: marketId });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};
