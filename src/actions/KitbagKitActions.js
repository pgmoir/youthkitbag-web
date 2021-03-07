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
  SEARCH_KITBAG_KITS,
} from './types';
import history from '../utils/history';

export const fetchKitbagKits = ({
  by,
  searchfor,
  page,
  pagesize,
  order,
  direction,
  kitbagId,
}) => (dispatch) => {
  axios
    .get(`/kitbag/kit/${kitbagId}`, {
      params: { by, searchfor, page, pagesize, order, direction },
    })
    .then((response) => {
      dispatch({ type: FETCH_KITBAG_KITS, payload: response.data });
      dispatch({
        type: SEARCH_KITBAG_KITS,
        payload: { searchfor, by, page, pagesize, order, direction },
      });
      history.push(
        `/kitbag/kit/${kitbagId}?searchfor=${searchfor}&by=${by}&page=${page}&pagesize=${pagesize}&order=${order}&direction=${direction}`
      );
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

export const fetchRecentKitbagKits = ({ created, days, kitbagId }) => (
  dispatch
) => {
  axios
    .get(`/kitbag/kit/${kitbagId}/recent`, {
      params: { created, days },
    })
    .then((response) => {
      dispatch({
        type: FETCH_RECENT_KITS,
        payload: { ...response.data, created, days },
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
      history.push(`/kitbag/kit/${kitbagId}`);
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
      history.push(`/kitbag/kit/${kitbagId}`);
      dispatch({ type: EDIT_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const deleteKitbagKit = ({ kitbagId, kitId }) => (dispatch) => {
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

export const fetchKitbagLists = (kitbagId = null) => (dispatch) => {
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
