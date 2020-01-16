import {
  FETCH_KITBAG_KITS,
  FETCH_MARKET_ITEMS,
  FETCH_GROUPS,
  RESET,
  LOGOUT
} from '../actions/types';

const initialState = { totalItems: 0, itemsPerPage: 24, currentPage: 1 };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_KITS:
    case FETCH_MARKET_ITEMS:
    case FETCH_GROUPS:
      return { ...state, ...action.payload.pagination };
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
