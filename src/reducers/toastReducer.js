import {
  RESET_TOAST,
  LOGOUT,
  CREATE_GROUP,
  CREATE_MARKET_KIT,
  CREATE_KITBAG_KIT,
  DELETE_MARKET_KIT,
  DELETE_KITBAG_KIT,
  LOGIN_FAILURE,
  EDIT_GROUP_STATE,
  EDIT_GROUP_MEMBER_STATE,
  GROUP_MEMBER_DELETE,
  EDIT_USER,
  RESET_USER_FLAGS,
  API_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  EDIT_KITBAG_KIT,
  EDIT_MARKET_KIT,
  EDIT_GROUP,
  API_USER_ERROR,
  CREATE_KITBAG,
  EDIT_KITBAG,
  RESET_REQUESTED,
  PASSWORD_RESET,
  GROUP_MEMBER_JOIN,
} from '../actions/types';

const initialState = {
  currentMessage: '',
  currentStyle: '',
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
    case CREATE_KITBAG:
    case EDIT_KITBAG:
    case CREATE_KITBAG_KIT:
    case CREATE_MARKET_KIT:
    case EDIT_GROUP:
    case EDIT_GROUP_STATE:
    case EDIT_GROUP_MEMBER_STATE:
    case EDIT_USER:
    case RESET_USER_FLAGS:
    case EDIT_KITBAG_KIT:
    case EDIT_MARKET_KIT:
    case SIGNUP_SUCCESS:
    case RESET_REQUESTED:
    case PASSWORD_RESET:
    case GROUP_MEMBER_JOIN:
      return {
        currentMessage: action.payload.message,
        currentStyle: 'success',
      };
    case DELETE_KITBAG_KIT:
    case DELETE_MARKET_KIT:
    case GROUP_MEMBER_DELETE:
      return {
        currentMessage: action.payload.message,
        currentStyle: 'warning',
      };
    case API_USER_ERROR:
    case API_ERROR:
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return {
        currentMessage: action.payload.message,
        currentStyle: 'error',
        errors: action.payload.errors,
      };
    case RESET_TOAST:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
