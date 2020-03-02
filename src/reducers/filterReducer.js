import {
  FETCH_KITBAG_KITS,
  FETCH_MARKET_ITEMS,
  FETCH_GROUPS,
  RESET,
  LOGOUT
} from '../actions/types';

const initialState = {
  options: [{ key: '', value: 'All' }]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_KITS:
    case FETCH_MARKET_ITEMS:
    case FETCH_GROUPS:
      return { ...state, ...action.payload.filter };
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
