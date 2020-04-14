import axios from 'axios';
import {
  FETCH_PACKAGE,
  FETCH_PACKAGES,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchSubscriptionPackages = () => (dispatch) => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/packages`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json',
      },
    })
    .then((response) => {
      dispatch({ type: FETCH_PACKAGES, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/packages');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchSubscriptionPackage = (packageId) => (dispatch) => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/packages/${packageId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json',
      },
    })
    .then((response) => {
      dispatch({ type: FETCH_PACKAGE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/packages');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
