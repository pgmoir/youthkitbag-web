import axios from '../utils/axios';
import {
  CLEAR_KITBAG,
  FETCH_KITBAG,
  EDIT_KITBAG,
  EDIT_KITBAG_STATE,
  API_ERROR,
  INVITE_KITBAG_MEMBER,
  EDIT_KITBAG_LEAVE,
  CREATE_KITBAG,
  DELETE_KITBAG_MEMBER,
  REQUEST_TO_JOIN_KITBAG,
  EDIT_KITBAG_MEMBER_STATE,
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
      history.push('/settings/kitbags');
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
      dispatch({ type: INVITE_KITBAG_MEMBER, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const deleteFromKitbag = ({ kitbagId, memberId }) => (dispatch) => {
  axios
    .delete(`/kitbag/${kitbagId}/member/${memberId}`, {})
    .then((response) => {
      dispatch({ type: DELETE_KITBAG_MEMBER, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const updateMemberInKitbag = ({ kitbagId, memberId, formValues }) => (
  dispatch
) => {
  axios
    .put(`/kitbag/${kitbagId}/member/${memberId}`, { ...formValues })
    .then((response) => {
      dispatch({ type: EDIT_KITBAG_MEMBER_STATE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      dispatch({ type: API_ERROR, payload: response.data });
    });
};

export const requestToJoinKitbag = ({ kitbagId }) => (dispatch) => {
  axios
    .put(`/kitbag/${kitbagId}/member/join`, {}, {})
    .then((response) => {
      dispatch({ type: REQUEST_TO_JOIN_KITBAG, payload: response.data });
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
