import {
  FETCH_MARKET_ITEMS,
  FETCH_GROUPS,
  FETCH_GROUP_MEMBERS,
  RESET,
  LOGOUT,
} from '../actions/types';

const initialState = {
  options: [{ key: '', value: 'All' }],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_ITEMS:
    case FETCH_GROUPS:
    case FETCH_GROUP_MEMBERS:
      return { ...state, ...action.payload.data.filter };
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
