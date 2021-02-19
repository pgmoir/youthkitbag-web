import axios from '../utils/axios';
import {
  CLEAR_KITBAG,
  FETCH_KITBAG,
  EDIT_KITBAG,
  EDIT_KITBAG_STATE,
  API_ERROR,
  CREATE_KITBAG_INVITE,
  EDIT_KITBAG_LEAVE,
  CREATE_KITBAG,
} from './types';
import history from '../utils/history';

export const fetchKitbag = (kitbagId) => (dispatch) => {
  axios
    .get(`/kitbag/${kitbagId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_KITBAG, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const fetchKitbagName = (kitbagId) => (dispatch) => {
  axios
    .get(`/kitbag/${kitbagId}/name`, {})
    .then((response) => {
      dispatch({ type: FETCH_KITBAG, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const createKitbag = (formValues) => (dispatch) => {
  axios
    .post(`/kitbag`, { ...formValues }, {})
    .then((response) => {
      dispatch({ type: CREATE_KITBAG, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const editKitbag = (kitbagId, formValues) => (dispatch) => {
  axios
    .put(`/kitbag/${kitbagId}`, { ...formValues }, {})
    .then((response) => {
      dispatch({ type: EDIT_KITBAG, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const editKitbagState = (kitbagId, state) => (dispatch) => {
  axios
    .put(`/kitbag/${kitbagId}/state`, { state: state }, {})
    .then((response) => {
      history.push('/settings/kitbags');
      dispatch({ type: EDIT_KITBAG_STATE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const inviteToKitbag = ({ kitbagId, formValues }) => (dispatch) => {
  axios
    .post(`/kitbag/${kitbagId}/member/invite`, { ...formValues }, {})
    .then((response) => {
      dispatch({ type: CREATE_KITBAG_INVITE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const requestToJoinKitbag = (email) => (dispatch) => {
  axios
    .post(`/kitbag/requesttojoin/${email}`, {}, {})
    .then(() => {
      history.push(`/`);
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
      history.push(`/`);
    });
};

export const requestKitbagLeave = (kitbagId) => (dispatch) => {
  axios
    .put(`/kitbag/${kitbagId}/members/leave`, {}, {})
    .then((response) => {
      history.push(`/settings/kitbags`);
      dispatch({ type: EDIT_KITBAG_LEAVE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const clearKitbag = () => (dispatch) => {
  dispatch({ type: CLEAR_KITBAG });
};
