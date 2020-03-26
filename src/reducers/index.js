import { combineReducers } from 'redux';

import authReducer from './authReducer';
import accountReducer from './accountReducer';
import userReducer from './userReducer';
import groupReducer from './groupReducer';
import kitbagReducer from './kitbagReducer';
import marketReducer from './marketReducer';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import toastReducer from './toastReducer';
import subscriptionReducer from './subscriptionReducer';
import imageReducer from './imageReducer';
import showReducer from './showReducer';

export default combineReducers({
  account: accountReducer,
  auth: authReducer,
  user: userReducer,
  group: groupReducer,
  kitbag: kitbagReducer,
  market: marketReducer,
  filter: filterReducer,
  pagination: paginationReducer,
  toast: toastReducer,
  subscription: subscriptionReducer,
  images: imageReducer,
  show: showReducer
});
