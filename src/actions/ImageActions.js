import axios from 'axios';
import { ADD_IMAGE, CLEAR_NEW_IMAGES, API_KITBAG_ERROR } from './types';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const addImage = (accountId, formData) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(`${baseUrl}/image/${accountId}/add`, formData, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: ADD_IMAGE, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const clearNewImages = () => dispatch => {
  dispatch({ type: CLEAR_NEW_IMAGES });
};
