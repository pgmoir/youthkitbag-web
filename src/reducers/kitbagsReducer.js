import {
  FETCH_KITBAG,
  FETCH_KITBAG_MEMBERS,
  LOGOUT,
  CLEAR_KITBAG,
  FETCH_PREFERRED_KITBAG,
  CREATE_KITBAG,
  EDIT_KITBAG,
  INVITE_KITBAG_MEMBER,
  DELETE_KITBAG_MEMBER,
} from '../actions/types';

const initialState = { preferred: {}, current: {}, memberList: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREFERRED_KITBAG: {
      return {
        ...state,
        preferred: action.payload.data,
      };
    }

    case CREATE_KITBAG:
    case EDIT_KITBAG:
    case FETCH_KITBAG:
    case INVITE_KITBAG_MEMBER:
    case DELETE_KITBAG_MEMBER: {
      return {
        ...state,
        current: action.payload.data,
        memberList: {},
      };
    }

    case FETCH_KITBAG_MEMBERS: {
      return { ...state, memberList: action.payload.data };
    }

    case CLEAR_KITBAG:
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
