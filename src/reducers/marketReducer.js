import {
  SEARCH_MARKET_ITEMS,
  FETCH_MARKET_ITEMS,
  FETCH_MARKET_ITEM,
  RESET,
  LOGOUT
} from '../actions/types';

const initialState = {
  list: [],
  current: {},
  search: { searchfor: '', by: '', page: 1, pagesize: 24, loading: true }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MARKET_ITEMS:
      console.log('SEARCH MI', action.payload);
      return { ...state, search: action.payload };
    case FETCH_MARKET_ITEMS:
      return { ...state, current: {}, list: action.payload.items };
    case FETCH_MARKET_ITEM:
      return { ...state, current: action.payload };
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
