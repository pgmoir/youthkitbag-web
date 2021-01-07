import axios from '../utils/axios';
import {
  FETCH_SHOW_GROUP,
  API_ERROR,
  FETCH_SHOW_MARKET_TRADES,
  FETCH_SHOW_MARKET_RECYCLES,
  FETCH_SHOW_MARKET_FOUNDS,
  FETCH_SHOW_MARKET_LOSTS,
  FETCH_SHOW_MARKET_STOLENS,
  FETCH_SHOW_MARKET_WANTEDS,
} from './types';
import { MarketTypes } from '../enums/marketTypes.enum';

export const fetchShowGroup = (groupId) => (dispatch) => {
  axios
    .get(`/show/group/${groupId}`)
    .then((response) => {
      dispatch({ type: FETCH_SHOW_GROUP, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
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
      dispatch({ type: API_ERROR, payload: response.data });
    });
};
