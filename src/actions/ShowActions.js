import axios from 'axios';
import { FETCH_SHOW_GROUP, API_KITBAG_ERROR, GETALL_FAILURE } from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchShowGroup = groupId => dispatch => {
  axios
    .get(`${baseUrl}/show/group/${groupId}`)
    .then(response => {
      dispatch({ type: FETCH_SHOW_GROUP, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
