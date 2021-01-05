import { FETCH_BUNDLE, LOGOUT, FETCH_BUNDLES } from '../actions/types';

const initialState = { items: [], selected: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUNDLES:
      return { ...state, items: action.payload.data.bundles };
    case FETCH_BUNDLE:
      return { ...state, selected: action.payload.data };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
