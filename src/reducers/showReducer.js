import { FETCH_SHOW_GROUP, LOGOUT } from '../actions/types';

const initialState = {
  group: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOW_GROUP:
      return { ...state, group: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
