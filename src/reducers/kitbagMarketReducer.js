import {
  FETCH_MARKET_KIT,
  CREATE_MARKET_KIT,
  EDIT_MARKET_KIT,
  DELETE_MARKET_KIT,
  LOGOUT
} from '../actions/types';

const initialState = { current: {}, list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_KIT:
      return { ...state, current: action.payload };
    case CREATE_MARKET_KIT:
      return { current: action.payload.stolen, list: [] };
    case EDIT_MARKET_KIT:
      return { ...state, current: action.payload };
    case DELETE_MARKET_KIT:
      return { ...state };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
