import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import groupReducer from './groupReducer';
import kitbagReducer from './kitbagReducer';
import marketReducer from './marketReducer';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import toastReducer from './toastReducer';
import packagesReducer from './packagesReducer';
import imageReducer from './imageReducer';
import showReducer from './showReducer';
import contentReducer from './contentReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  group: groupReducer,
  kitbag: kitbagReducer,
  market: marketReducer,
  filter: filterReducer,
  pagination: paginationReducer,
  toast: toastReducer,
  packages: packagesReducer,
  images: imageReducer,
  show: showReducer,
  content: contentReducer,
});
