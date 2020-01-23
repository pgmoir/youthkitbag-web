import {
  FETCH_KITBAG_KIT,
  CREATE_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  RESET,
  LOGOUT,
  FETCH_KITBAG_LISTS
} from '../actions/types';

const initialState = { current: {}, list: [], lists: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_KITS:
      return { ...state, current: {}, list: action.payload.kits };
    case FETCH_KITBAG_KIT:
      return { ...state, current: action.payload, list: [] };
    case CREATE_KITBAG_KIT:
    case EDIT_KITBAG_KIT:
      return { ...state, current: action.payload.kit, list: [] };
    case FETCH_KITBAG_LISTS:
      return { ...state, lists: action.payload };
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
