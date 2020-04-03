import {
  FETCH_GROUPS,
  FETCH_GROUP,
  FETCH_GROUP_MEMBERS,
  LOGOUT,
  CREATE_GROUP,
  EDIT_GROUP,
  SEARCH_GROUPS,
  FETCH_GROUPS_MEMBER_REQUESTS,
} from '../actions/types';

const initialState = {
  current: {},
  list: [],
  memberList: {},
  search: { searchfor: '', by: '', page: 1, pagesize: 24, loading: true },
  memberRequests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_GROUPS:
      return { ...state, search: action.payload };
    case FETCH_GROUPS:
      return {
        ...state,
        current: {},
        list: action.payload.groups,
        memberList: {},
      };
    case FETCH_GROUP:
      return {
        ...state,
        current: action.payload,
        memberList: {},
      };
    case CREATE_GROUP:
    case EDIT_GROUP:
      return {
        ...state,
        current: {},
        memberList: {},
      };
    case FETCH_GROUP_MEMBERS:
      return { ...state, memberList: action.payload };
    case FETCH_GROUPS_MEMBER_REQUESTS:
      return { ...state, memberRequests: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
