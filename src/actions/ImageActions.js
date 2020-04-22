import axios from 'axios';
import { getHeaders, updateTokens } from '../helpers/ykbApi';
import { ADD_IMAGE, CLEAR_NEW_IMAGES, API_KITBAG_ERROR } from './types';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const addImage = (accountId, formData) => (dispatch) => {
  axios
    .post(`${baseUrl}/image/${accountId}/add`, formData, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: ADD_IMAGE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const clearNewImages = () => (dispatch) => {
  dispatch({ type: CLEAR_NEW_IMAGES });
};
