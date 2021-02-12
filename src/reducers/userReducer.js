import { EDIT_USER, GET_USER, LOGOUT } from '../actions/types';

const initialState = {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
    case EDIT_USER: {
      const user = action.payload.data;
      const topImage = user.images
        ? user.images[0].imageUrl
        : '/images/defaultthumb.png';
      return { topImage, ...user };
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
