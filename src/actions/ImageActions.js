import axios from '../utils/axios';
import { ADD_IMAGE, CLEAR_NEW_IMAGES, API_ERROR } from './types';

export const addImage = (kitbagId, formData) => (dispatch) => {
  axios
    .post(`/image/${kitbagId}/add`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((response) => {
      dispatch({ type: ADD_IMAGE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const clearNewImages = () => (dispatch) => {
  dispatch({ type: CLEAR_NEW_IMAGES });
};
