import { ADD_IMAGE, CLEAR_NEW_IMAGES, LOGOUT } from '../actions/types';

const initialState = { newImages: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        newImages: [...state.newImages, action.payload],
      };
    case CLEAR_NEW_IMAGES:
      return { newImages: [] };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
