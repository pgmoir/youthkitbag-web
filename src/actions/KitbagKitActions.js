import axios from '../utils/axios';
import {
  CREATE_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  FETCH_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  DELETE_KITBAG_KIT,
  API_ERROR,
  FETCH_KITBAG_LISTS,
  FETCH_RECENT_KITS,
  FETCH_WARNING_KITS
} from './types';

export const fetchKitbagKits = (filter) => (dispatch) => {
  axios
    .post(`/kitbag/kit/${filter.kitbagId}/filter`, {
      ...filter
    })
    .then((response) => {
      dispatch({ type: FETCH_KITBAG_KITS, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response });
    });
};

export const fetchKitbagKit = (kitbagId, kitId) => (dispatch) => {
  axios
    .get(`/kitbag/kit/${kitbagId}/${kitId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const fetchRecentKitbagKits =
  ({ created, days, kitbagId }) =>
  (dispatch) => {
    axios
      .get(`/kitbag/kit/${kitbagId}/recent`, {
        params: { created, days }
      })
      .then((response) => {
        dispatch({
          type: FETCH_RECENT_KITS,
          payload: { ...response.data, created, days }
        });
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_ERROR, payload: response });
      });
  };

export const fetchWarningsKitbagKits =
  ({ kitbagId }) =>
  (dispatch) => {
    axios
      .get(`/kitbag/kit/${kitbagId}/warnings`)
      .then((response) => {
        dispatch({
          type: FETCH_WARNING_KITS,
          payload: { ...response.data }
        });
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_ERROR, payload: response });
      });
  };

export const createKitbagKit = (kitbagId, formValues) => (dispatch) => {
  axios
    .post(`/kitbag/kit/${kitbagId}`, { ...formValues }, {})
    .then((response) => {
      dispatch({ type: CREATE_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const editKitbagKit = (kitbagId, kitId, formValues) => (dispatch) => {
  axios
    .put(`/kitbag/kit/${kitbagId}/${kitId}`, { ...formValues }, {})
    .then((response) => {
      dispatch({ type: EDIT_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const deleteKitbagKit =
  ({ kitbagId, kitId }) =>
  (dispatch) => {
    axios
      .delete(`/kitbag/kit/${kitbagId}/${kitId}`, {})
      .then(() => {
        dispatch({ type: DELETE_KITBAG_KIT, payload: kitId });
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_ERROR, payload: response.data });
      });
  };

export const fetchKitbagLists =
  (kitbagId = null) =>
  (dispatch) => {
    axios
      .get(`/kitbag/kit/${kitbagId}/lists`, {})
      .then((response) => {
        dispatch({ type: FETCH_KITBAG_LISTS, payload: response.data });
      })
      .catch((err) => {
        const { response } = err;
        dispatch({ type: API_ERROR, payload: response.data });
      });
  };
