import {
  FETCH_KITBAG,
  FETCH_KITBAG_MEMBERS,
  LOGOUT,
  CLEAR_KITBAG,
  FETCH_PREFERRED_KITBAG,
} from '../actions/types';

const initialState = { preferred: {}, current: {}, memberList: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREFERRED_KITBAG:
      return {
        ...state,
        preferred: action.payload,
      };
    case FETCH_KITBAG:
      return {
        ...state,
        current: action.payload,
        memberList: {},
      };
    case FETCH_KITBAG_MEMBERS:
      return { ...state, memberList: action.payload };
    case CLEAR_KITBAG:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
