import axios from '../utils/axios';
import {
  FETCH_BUNDLE,
  FETCH_BUNDLES,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
} from './types';
import history from '../utils/history';

export const fetchSubscriptionBundles = () => (dispatch) => {
  axios
    .get(`/bundles`, {})
    .then((response) => {
      dispatch({ type: FETCH_BUNDLES, payload: response.data.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push('/auth/login?return=/bundles');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const fetchSubscriptionBundle = (bundleId) => (dispatch) => {
  axios
    .get(`/bundles/${bundleId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_BUNDLE, payload: response.data.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response.data });
        history.push('/auth/login?return=/bundles');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};
