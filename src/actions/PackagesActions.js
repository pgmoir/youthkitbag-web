import axios from '../utils/axios';
import {
  FETCH_PACKAGE,
  FETCH_PACKAGES,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
} from './types';
import history from '../utils/history';

export const fetchSubscriptionPackages = () => (dispatch) => {
  axios
    .get(`/packages`, {})
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
  axios
    .get(`/packages/${packageId}`, {})
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
