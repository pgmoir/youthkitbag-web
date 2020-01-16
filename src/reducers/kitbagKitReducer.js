import {
  FETCH_KITBAG_KIT,
  CREATE_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  RESET,
  LOGOUT
} from '../actions/types';

const initialState = { current: {}, list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_KITS:
      return { current: {}, list: action.payload.kits };
    case FETCH_KITBAG_KIT:
      return { current: action.payload, list: [] };
    case CREATE_KITBAG_KIT:
    case EDIT_KITBAG_KIT:
      return { current: action.payload.kit, list: [] };
    case RESET:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
