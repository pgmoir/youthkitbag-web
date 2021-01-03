import {
  FETCH_KITBAG,
  FETCH_KITBAG_MEMBERS,
  LOGOUT,
  CLEAR_KITBAG,
} from '../actions/types';

const initialState = { current: {}, memberList: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG:
      return {
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
