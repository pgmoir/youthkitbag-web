import axios from 'axios';
import {
  FETCH_SHOW_GROUP,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  FETCH_SHOW_MARKET_TRADES,
  FETCH_SHOW_MARKET_RECYCLES,
  FETCH_SHOW_MARKET_STOLENS,
  FETCH_SHOW_MARKET_WANTEDS
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchShowGroup = groupId => dispatch => {
  axios
    .get(`${baseUrl}/show/group/${groupId}`)
    .then(response => {
      dispatch({ type: FETCH_SHOW_GROUP, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchShowGroupMarket = (groupId, by) => dispatch => {
  axios
    .get(`${baseUrl}/show/group/market/${groupId}/${by}`)
    .then(response => {
      switch (by) {
        case 'recycle':
          dispatch({
            type: FETCH_SHOW_MARKET_RECYCLES,
            payload: response.data
          });
          break;
        case 'stolen':
          dispatch({
            type: FETCH_SHOW_MARKET_STOLENS,
            payload: response.data
          });
          break;
        case 'wanted':
          dispatch({
            type: FETCH_SHOW_MARKET_WANTEDS,
            payload: response.data
          });
          break;
        default:
          dispatch({
            type: FETCH_SHOW_MARKET_TRADES,
            payload: response.data
          });
          break;
      }
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
