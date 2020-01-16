import {
  FETCH_MARKET_KIT,
  CREATE_MARKET_KIT,
  EDIT_MARKET_KIT,
  DELETE_MARKET_KIT,
  RESET,
  LOGOUT,
  RESPOND_MARKET_KIT,
  FETCH_MARKET_ITEMS
} from '../actions/types';

const initialState = { current: {} };

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
    case FETCH_MARKET_ITEMS:
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
