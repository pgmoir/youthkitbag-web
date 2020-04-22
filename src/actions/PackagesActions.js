import axios from 'axios';
import { getHeaders, updateTokens } from '../helpers/ykbApi';
import {
  FETCH_PACKAGE,
  FETCH_PACKAGES,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchSubscriptionPackages = () => (dispatch) => {
  axios
    .get(`${baseUrl}/packages`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
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
  axios
    .get(`${baseUrl}/packages/${packageId}`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
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
