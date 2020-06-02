import axios from '../utils/axios';
import {
  CREATE_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  FETCH_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  DELETE_KITBAG_KIT,
  API_KITBAG_ERROR,
  FETCH_KITBAG_LISTS,
  GETALL_FAILURE,
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
  accountId,
  pushHistory,
}) => (dispatch) => {
  axios
    .get(`/kitbag/kit/${accountId}`, {
      params: { by, searchfor, page, pagesize, order, direction },
    })
    .then((response) => {
      dispatch({ type: FETCH_KITBAG_KITS, payload: response.data });
      if (pushHistory) {
        dispatch({
          type: SEARCH_KITBAG_KITS,
          payload: { searchfor, by, page, pagesize, order, direction },
        });
        history.push(
          `/kitbag/kit/${accountId}?searchfor=${searchfor}&by=${by}&page=${page}&pagesize=${pagesize}&order=${order}&direction=${direction}`
        );
      }
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const fetchKitbagKit = (accountId, kitId) => (dispatch) => {
  axios
    .get(`/kitbag/kit/${accountId}/${kitId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createKitbagKit = (accountId, formValues) => (dispatch) => {
  axios
    .post(`/kitbag/kit/${accountId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/kitbag/kit/${accountId}`);
      dispatch({ type: CREATE_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editKitbagKit = (accountId, kitId, formValues) => (dispatch) => {
  axios
    .put(`/kitbag/kit/${accountId}/${kitId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/kitbag/kit/${accountId}`);
      dispatch({ type: EDIT_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const deleteKitbagKit = (accountId, kitId) => (dispatch) => {
  axios
    .delete(`/kitbag/kit/${accountId}/${kitId}`, {})
    .then((response) => {
      history.push(`/kitbag/kit/${accountId}`);
      dispatch({ type: DELETE_KITBAG_KIT, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbag/kit/${accountId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchKitbagLists = (accountId = null) => (dispatch) => {
  axios
    .get(`/kitbag/kit/${accountId}/lists`, {})
    .then((response) => {
      dispatch({ type: FETCH_KITBAG_LISTS, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};
