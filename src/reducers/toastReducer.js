import {
  RESET_TOAST,
  API_KITBAG_ERROR,
  LOGOUT,
  CREATE_GROUP,
  CREATE_MARKET_KIT,
  CREATE_KITBAG_KIT,
  DELETE_MARKET_KIT,
  DELETE_KITBAG_KIT,
  LOGIN_FAILURE,
  EDIT_GROUP_STATUS,
  EDIT_GROUP_MEMBER_STATE,
  EDIT_USER_PROFILE,
  API_MARKET_ERROR
} from '../actions/types';

const initialState = {
  currentMessage: '',
  currentStyle: '',
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
    case CREATE_KITBAG_KIT:
    case CREATE_MARKET_KIT:
    case EDIT_GROUP_STATUS:
    case EDIT_GROUP_MEMBER_STATE:
    case EDIT_USER_PROFILE:
      return {
        currentMessage: action.payload.message,
        currentStyle: 'success'
      };
    case DELETE_KITBAG_KIT:
    case DELETE_MARKET_KIT:
      return {
        currentMessage: action.payload.message,
        currentStyle: 'warning'
      };
    case API_KITBAG_ERROR:
    case API_MARKET_ERROR:
      return {
        currentMessage: action.payload.data.message,
        currentStyle: 'error',
        errors: action.payload.data.errors
      };
    case LOGIN_FAILURE:
      return {
        currentMessage: action.payload.data.message,
        currentStyle: 'error'
      };
    case RESET_TOAST:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
