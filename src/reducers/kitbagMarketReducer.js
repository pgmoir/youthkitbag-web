import {
  FETCH_MARKET_KIT,
  CREATE_MARKET_KIT,
  EDIT_MARKET_KIT,
  RESET,
  LOGOUT,
  RESPOND_MARKET_KIT,
  FETCH_KITBAG_MARKET_ITEMS,
  FETCH_KITBAG_MARKET_TRADES,
  FETCH_KITBAG_MARKET_RECYCLES,
  FETCH_KITBAG_MARKET_FOUNDS,
  FETCH_KITBAG_MARKET_LOSTS,
  FETCH_KITBAG_MARKET_STOLENS,
  FETCH_KITBAG_MARKET_WANTEDS,
} from '../actions/types';

const initialState = {
  current: {},
  list: [],
  trades: [],
  recycles: [],
  founds: [],
  losts: [],
  stolens: [],
  wanteds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_MARKET_ITEMS:
      return { ...state, list: action.payload };

    case FETCH_KITBAG_MARKET_TRADES:
      return { ...state, trades: action.payload };

    case FETCH_KITBAG_MARKET_RECYCLES:
      return { ...state, recycles: action.payload };

    case FETCH_KITBAG_MARKET_FOUNDS:
      return { ...state, founds: action.payload };

    case FETCH_KITBAG_MARKET_LOSTS:
      return { ...state, losts: action.payload };

    case FETCH_KITBAG_MARKET_STOLENS:
      return { ...state, stolens: action.payload };

    case FETCH_KITBAG_MARKET_WANTEDS:
      return { ...state, wanteds: action.payload };

    case FETCH_MARKET_KIT:
    case CREATE_MARKET_KIT:
    case EDIT_MARKET_KIT:
    case RESPOND_MARKET_KIT:
      return { ...state, current: action.payload.data };

    case RESET:
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
