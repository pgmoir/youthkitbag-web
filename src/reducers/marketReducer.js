import {
  SEARCH_MARKET_ITEMS,
  FETCH_MARKET_ITEMS,
  FETCH_MARKET_ITEM,
  RESET,
  LOGOUT,
  FETCH_MARKET_LISTS,
  DELETE_MARKET_KIT,
} from '../actions/types';

const initialState = {
  entities: {},
  lists: [],
  search: { searchfor: '', by: '', page: 1, pagesize: 24, loading: true },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MARKET_ITEMS: {
      return { ...state, search: action.payload };
    }

    case FETCH_MARKET_ITEMS: {
      const { markets } = action.payload.data;
      let entities = {};
      markets.forEach((market) => {
        entities[market._id] = { ...market };
      });
      return { ...state, entities };
    }

    case DELETE_MARKET_KIT: {
      const marketId = action.payload;
      const { [marketId]: value, ...otherEntities } = state.entities;
      return { ...state, entities: otherEntities };
    }

    case FETCH_MARKET_ITEM: {
      const market = action.payload.data;
      const marketId = market._id;
      const entities = { ...state.entities, [marketId]: market };
      return { ...state, entities };
    }

    case FETCH_MARKET_LISTS: {
      return { ...state, lists: action.payload.data };
    }

    case RESET:
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
