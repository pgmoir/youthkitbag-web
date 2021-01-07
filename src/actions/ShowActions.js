import axios from '../utils/axios';
import {
  FETCH_SHOW_GROUP,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  FETCH_SHOW_MARKET_TRADES,
  FETCH_SHOW_MARKET_RECYCLES,
  FETCH_SHOW_MARKET_FOUNDS,
  FETCH_SHOW_MARKET_LOSTS,
  FETCH_SHOW_MARKET_STOLENS,
  FETCH_SHOW_MARKET_WANTEDS,
} from './types';
import history from '../utils/history';
import { MarketTypes } from '../enums/marketTypes.enum';

export const fetchShowGroup = (groupId) => (dispatch) => {
  axios
    .get(`/show/group/${groupId}`)
    .then((response) => {
      dispatch({ type: FETCH_SHOW_GROUP, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push('/auth/login?return=/groups/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const fetchShowGroupMarket = (groupId, by) => (dispatch) => {
  axios
    .get(`/show/group/market/${groupId}/${by}`)
    .then((response) => {
      switch (by) {
        case MarketTypes.RECYCLE:
          dispatch({
            type: FETCH_SHOW_MARKET_RECYCLES,
            payload: response.data,
          });
          break;
        case MarketTypes.FOUND:
          dispatch({
            type: FETCH_SHOW_MARKET_FOUNDS,
            payload: response.data,
          });
          break;
        case MarketTypes.LOST:
          dispatch({
            type: FETCH_SHOW_MARKET_LOSTS,
            payload: response.data,
          });
          break;
        case MarketTypes.STOLEN:
          dispatch({
            type: FETCH_SHOW_MARKET_STOLENS,
            payload: response.data,
          });
          break;
        case MarketTypes.WANTED:
          dispatch({
            type: FETCH_SHOW_MARKET_WANTEDS,
            payload: response.data,
          });
          break;
        default:
          dispatch({
            type: FETCH_SHOW_MARKET_TRADES,
            payload: response.data,
          });
          break;
      }
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push('/auth/login?return=/groups/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};
