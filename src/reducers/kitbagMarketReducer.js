import {
  FETCH_MARKET_KIT,
  CREATE_MARKET_KIT,
  EDIT_MARKET_KIT,
  DELETE_MARKET_KIT,
  RESET,
  LOGOUT,
  RESPOND_MARKET_KIT,
  FETCH_MARKET_ITEMS,
  FETCH_KITBAG_MARKET_ITEMS,
  FETCH_KITBAG_MARKET_TRADES,
  FETCH_KITBAG_MARKET_RECYCLES,
  FETCH_KITBAG_MARKET_STOLENS,
  FETCH_KITBAG_MARKET_WANTEDS,
} from '../actions/types';

const initialState = {
  current: {},
  list: [],
  trades: [],
  recycles: [],
  stolens: [],
  wanteds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_KIT:
      return { ...state, current: action.payload };
    case CREATE_MARKET_KIT:
      return { current: action.payload.market };
    case EDIT_MARKET_KIT:
      return { ...state, current: action.payload };
    case RESPOND_MARKET_KIT:
      return { ...state, current: action.payload };
    case DELETE_MARKET_KIT:
      return { ...state };
    case FETCH_KITBAG_MARKET_ITEMS:
      return { ...state, list: action.payload };
    case FETCH_KITBAG_MARKET_TRADES:
      return { ...state, trades: action.payload };
    case FETCH_KITBAG_MARKET_RECYCLES:
      return { ...state, recycles: action.payload };
    case FETCH_KITBAG_MARKET_STOLENS:
      return { ...state, stolens: action.payload };
    case FETCH_KITBAG_MARKET_WANTEDS:
      return { ...state, wanteds: action.payload };
    case FETCH_MARKET_ITEMS:
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
