import { FETCH_PACKAGE, LOGOUT, FETCH_PACKAGES } from '../actions/types';

const initialState = { items: [], selected: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PACKAGES:
      return { ...state, items: action.payload.packages };
    case FETCH_PACKAGE:
      return { ...state, selected: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
