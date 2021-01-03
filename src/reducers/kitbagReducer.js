import { combineReducers } from 'redux';
import kitbagKitReducer from './kitbagKitReducer';
import kitbagMarketReducer from './kitbagMarketReducer';
import kitbagsReducer from './kitbagsReducer';

export default combineReducers({
  kitbags: kitbagsReducer,
  kit: kitbagKitReducer,
  market: kitbagMarketReducer,
});
