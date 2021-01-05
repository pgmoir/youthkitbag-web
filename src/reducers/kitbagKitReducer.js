import {
  SEARCH_KITBAG_KITS,
  FETCH_KITBAG_KIT,
  CREATE_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  RESET,
  LOGOUT,
  FETCH_KITBAG_LISTS,
} from '../actions/types';

const initialState = {
  current: {},
  list: [],
  lists: [],
  search: { searchfor: '', by: '', page: 1, pagesize: 24, loading: true },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_KITBAG_KITS:
      return { ...state, search: action.payload };
    case FETCH_KITBAG_KITS:
      return { ...state, current: {}, list: action.payload.kits };
    case FETCH_KITBAG_KIT:
    case CREATE_KITBAG_KIT:
    case EDIT_KITBAG_KIT:
      return { ...state, current: action.payload.data };
    case FETCH_KITBAG_LISTS:
      return { ...state, lists: action.payload.data };
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
