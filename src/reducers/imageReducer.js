import {
  ADD_IMAGE,
  CLEAR_NEW_IMAGES,
  LOADING_IMAGES,
  RESET_LOADING_IMAGES,
  LOGOUT,
} from '../actions/types';

const initialState = { newImages: [], loading: false, numberOfImages: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        newImages: [...state.newImages, action.payload.data],
        loading: false,
        numberOfImages: 0,
      };
    case CLEAR_NEW_IMAGES:
      return { newImages: [] };
    case LOADING_IMAGES:
      return { ...state, ...action.payload };
    case RESET_LOADING_IMAGES:
      return { ...state, loading: false, numberOfImages: 0 };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
