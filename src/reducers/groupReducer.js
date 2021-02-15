import {
  FETCH_GROUPS,
  FETCH_GROUP,
  FETCH_GROUP_MEMBERS,
  LOGOUT,
  CREATE_GROUP,
  EDIT_GROUP,
  SEARCH_GROUPS,
  FETCH_GROUPS_MEMBER_REQUESTS,
  SEARCH_GROUP_MEMBERS,
  CREATE_GROUP_JOIN,
} from '../actions/types';

const initialState = {
  current: {},
  list: [],
  memberList: {},
  search: { searchfor: '', by: '', page: 1, pagesize: 24, loading: true },
  searchMembers: { searchfor: '', by: '', loading: true },
  memberRequests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_GROUPS:
      return { ...state, search: action.payload };
    case SEARCH_GROUP_MEMBERS:
      return { ...state, searchMembers: action.payload };
    case FETCH_GROUPS:
      return {
        ...state,
        current: {},
        list: action.payload.data.groups,
        memberList: {},
      };
    case FETCH_GROUP:
    case CREATE_GROUP:
    case CREATE_GROUP_JOIN:
    case EDIT_GROUP:
      return {
        ...state,
        current: action.payload.data,
        memberList: {},
      };
    case FETCH_GROUP_MEMBERS:
      return { ...state, memberList: action.payload.data.members };
    case FETCH_GROUPS_MEMBER_REQUESTS:
      return { ...state, memberRequests: action.payload.data };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
