import {
  FETCH_ACCOUNT,
  FETCH_ACCOUNT_MEMBERS,
  LOGOUT,
  CLEAR_ACCOUNT
} from '../actions/types';

const initialState = { current: {}, memberList: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT:
      return {
        current: action.payload,
        memberList: {}
      };
    case FETCH_ACCOUNT_MEMBERS:
      return { ...state, memberList: action.payload };
    case CLEAR_ACCOUNT:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
