import axios from '../utils/axios';
import {
  FETCH_MARKET_ITEMS,
  FETCH_MARKET_ITEM,
  API_ERROR,
  RESPOND_MARKET_ITEM,
  SEARCH_MARKET_ITEMS,
  FETCH_MARKET_LISTS,
  RESET_TOAST,
} from './types';
import history from '../utils/history';

export const fetchMarketItems = ({
  searchFor = '',
  by = '',
  page = 1,
  pagesize = 24,
  order = 'updatedAt',
  direction = -1,
  excgroups = false,
  exckitbags = false,
}) => (dispatch) => {
  axios
    .get(`/market`, {
      params: {
        searchFor,
        by,
        page,
        pagesize,
        order,
        direction,
        excgroups,
        exckitbags,
      },
    })
    .then((response) => {
      dispatch({ type: FETCH_MARKET_ITEMS, payload: response.data });
      dispatch({
        type: SEARCH_MARKET_ITEMS,
        payload: { searchFor, by, page, pagesize, excgroups, exckitbags },
      });
      history.push(
        `/market?searchFor=${searchFor}&by=${by}&page=${page}&pagesize=${pagesize}&excgroups=${excgroups}&exckitbags=${exckitbags}`
      );
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const fetchMarketItem = (marketId) => (dispatch) => {
  axios
    .get(`/market/${marketId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_MARKET_ITEM, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const respondMarketItem = (marketId, formValues) => (dispatch) => {
  axios
    .post(`/market/respond/${marketId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/market/${marketId}`);
      dispatch({ type: RESET_TOAST });
      dispatch({ type: RESPOND_MARKET_ITEM, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const respondToMarketThread = (marketId, threadId, formValues) => (
  dispatch
) => {
  axios
    .put(`/market/respond/${marketId}/${threadId}`, { ...formValues }, {})
    .then(() => {
      dispatch({ type: RESET_TOAST });
      dispatch(fetchMarketItem(marketId));
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const fetchMarketLists = () => (dispatch) => {
  axios
    .get(`/market/lists`, {})
    .then((response) => {
      dispatch({ type: FETCH_MARKET_LISTS, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};
