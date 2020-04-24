import { FETCH_CONTENT } from '../actions/types';

const initialState = { data: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT: {
      return { data: action.payload };
    }
    default:
      return state;
  }
};
