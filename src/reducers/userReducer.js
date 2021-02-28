import {
  EDIT_USER,
  GET_USER,
  LOGOUT,
  REQUEST_TO_JOIN_KITBAG,
} from '../actions/types';

const initialState = {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
    case EDIT_USER: {
      const user = action.payload.data;
      return { ...user };
    }

    case REQUEST_TO_JOIN_KITBAG: {
      const { user } = action.payload.data;
      return { ...user };
    }

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
