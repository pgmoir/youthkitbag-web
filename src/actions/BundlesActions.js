import axios from '../utils/axios';
import { FETCH_BUNDLE, FETCH_BUNDLES, API_ERROR } from './types';

export const fetchSubscriptionBundles = () => (dispatch) => {
  axios
    .get(`/bundles`, {})
    .then((response) => {
      dispatch({ type: FETCH_BUNDLES, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const fetchSubscriptionBundle = (bundleId) => (dispatch) => {
  axios
    .get(`/bundles/${bundleId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_BUNDLE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};
