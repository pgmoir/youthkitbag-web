import {
  SEARCH_KITBAG_KITS,
  FETCH_KITBAG_KIT,
  CREATE_KITBAG_KIT,
  DELETE_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  FETCH_RECENT_KITS,
  RESET,
  LOGOUT,
  FETCH_KITBAG_LISTS,
} from '../actions/types';

const initialState = {
  entities: {},
  lists: [],
  search: { searchfor: '', by: '', page: 1, pagesize: 24, loading: true },
  recent: {
    createdItems: [],
    createdCount: 0,
    createdDays: 7,
    updatedItems: [],
    updatedCount: 0,
    updatedDays: 7,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_KITBAG_KITS: {
      return { ...state, search: action.payload };
    }

    case FETCH_KITBAG_KITS: {
      const { kits } = action.payload.data;
      let entities = {};
      kits.forEach((kit) => {
        entities[kit._id] = { ...kit };
      });
      return { ...state, entities };
    }

    case FETCH_RECENT_KITS: {
      console.log('PL', action.payload);
      const { created, days } = action.payload;
      const { kits, itemCount } = action.payload.data;
      const recent = created
        ? {
            ...state.recent,
            createdItems: kits,
            createdCount: itemCount,
            createdDays: days,
          }
        : {
            ...state.recent,
            updatedItems: kits,
            updatedCount: itemCount,
            updatedDays: days,
          };
      return { ...state, recent };
    }

    case DELETE_KITBAG_KIT: {
      const kitId = action.payload;
      // eslint-disable-next-line no-unused-vars
      const { [kitId]: value, ...otherEntities } = state.entities;
      return { ...state, entities: otherEntities };
    }

    case FETCH_KITBAG_KIT:
    case CREATE_KITBAG_KIT:
    case EDIT_KITBAG_KIT: {
      const kit = action.payload.data;
      const kitId = kit._id;
      const entities = { ...state.entities, [kitId]: kit };
      return { ...state, entities };
    }

    case FETCH_KITBAG_LISTS: {
      return { ...state, lists: action.payload.data };
    }

    case RESET:
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
