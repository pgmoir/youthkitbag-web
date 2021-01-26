import axios from '../utils/axios';
import { FETCH_BUNDLE, FETCH_BUNDLES, API_ERROR } from './types';

export const fetchBundles = ({ user }) => (dispatch) => {
  const defaultBundles = user && user._id ? '' : '/default';
  axios
    .get(`/bundle${defaultBundles}`, {})
    .then((response) => {
      dispatch({ type: FETCH_BUNDLES, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const fetchBundle = (bundleId) => (dispatch) => {
  console.log('BUN', bundleId);
  axios
    .get(`/bundle/${bundleId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_BUNDLE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};
