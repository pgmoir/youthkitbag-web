import {
  FETCH_SHOW_GROUP,
  LOGOUT,
  FETCH_SHOW_MARKET_TRADES,
  FETCH_SHOW_MARKET_RECYCLES,
  FETCH_SHOW_MARKET_FOUNDS,
  FETCH_SHOW_MARKET_LOSTS,
  FETCH_SHOW_MARKET_STOLENS,
  FETCH_SHOW_MARKET_WANTEDS,
} from '../actions/types';

const initialState = {
  group: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOW_GROUP:
      return { ...state, group: action.payload };
    case FETCH_SHOW_MARKET_TRADES:
      return { ...state, trades: action.payload };
    case FETCH_SHOW_MARKET_RECYCLES:
      return { ...state, recycles: action.payload };
    case FETCH_SHOW_MARKET_FOUNDS:
      return { ...state, founds: action.payload };
    case FETCH_SHOW_MARKET_LOSTS:
      return { ...state, losts: action.payload };
    case FETCH_SHOW_MARKET_STOLENS:
      return { ...state, stolens: action.payload };
    case FETCH_SHOW_MARKET_WANTEDS:
      return { ...state, wanteds: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
