import axios from '../utils/axios';
import {
  FETCH_MARKET_ITEMS,
  FETCH_MARKET_ITEM,
  API_MARKET_ERROR,
  GETALL_FAILURE,
  RESPOND_MARKET_ITEM,
  SEARCH_MARKET_ITEMS,
  FETCH_MARKET_LISTS,
  RESET_TOAST,
} from './types';
import history from '../utils/history';

export const fetchMarketItems = ({
  searchfor = '',
  by = '',
  page = 1,
  pagesize = 24,
  order,
  direction,
  excgroups = false,
  exckitbags = false,
  pushHistory,
}) => (dispatch) => {
  axios
    .get(`/market`, {
      params: {
        searchfor,
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
      if (pushHistory) {
        dispatch({
          type: SEARCH_MARKET_ITEMS,
          payload: { searchfor, by, page, pagesize, excgroups, exckitbags },
        });
        history.push(
          `/market?searchfor=${searchfor}&by=${by}&page=${page}&pagesize=${pagesize}&excgroups=${excgroups}&exckitbags=${exckitbags}`
        );
      }
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
    .get(`/market/${marketId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_MARKET_ITEM, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market');
      }
      dispatch({ type: API_MARKET_ERROR, payload: response.data });
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
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${marketId}`);
      }
      dispatch({ type: API_MARKET_ERROR, payload: response.data });
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
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/${marketId}`);
      }
      dispatch({ type: API_MARKET_ERROR, payload: response.data });
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
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login`);
      }
      dispatch({ type: API_MARKET_ERROR, payload: response });
    });
};
