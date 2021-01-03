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
  DELETE_GROUP_MEMBER,
  EDIT_USER,
  RESET_USER_FLAGS,
  API_MARKET_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  EDIT_KITBAG_KIT,
  EDIT_MARKET_KIT,
  EDIT_GROUP,
  API_USER_ERROR,
  API_KITBAG_ERROR,
} from '../actions/types';

const initialState = {
  currentMessage: '',
  currentStyle: '',
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
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
      return {
        currentMessage: action.payload.message,
        currentStyle: 'success',
      };
    case DELETE_KITBAG_KIT:
    case DELETE_MARKET_KIT:
    case DELETE_GROUP_MEMBER:
      return {
        currentMessage: action.payload.message,
        currentStyle: 'warning',
      };
    case API_USER_ERROR:
    case API_KITBAG_ERROR:
    case API_MARKET_ERROR:
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
