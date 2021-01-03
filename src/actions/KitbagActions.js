import axios from '../utils/axios';
import {
  CLEAR_KITBAG,
  FETCH_KITBAG,
  EDIT_KITBAG,
  EDIT_KITBAG_STATE,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  CREATE_KITBAG_INVITE,
  EDIT_KITBAG_LEAVE,
  FETCH_PREFERRED_KITBAG,
  RESET_TOAST,
} from './types';
import history from '../utils/history';
import { editPreferredKitbag, getUser } from './UserActions';

export const fetchPreferredKitbag = () => (dispatch) => {
  axios
    .get('/kitbag/preferred', {})
    .then((response) => {
      dispatch({
        type: FETCH_PREFERRED_KITBAG,
        payload: response.data,
      });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/view');
      }
      if (response.status === 400) {
        history.push('/');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const fetchKitbag = (kitbagId) => (dispatch) => {
  axios
    .get(`/kitbag/${kitbagId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_KITBAG, payload: response.data.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
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
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const createKitbag = (
  formValues,
  { pushHistory = true, forState } = {}
) => (dispatch) => {
  axios
    .post(`/kitbag`, { ...formValues }, {})
    .then((response) => {
      const { creator, _id } = response.data.data;

      if (pushHistory) {
        switch (forState) {
          case 'invite-team':
            history.push('/kitbag/inviteteam');
            break;
          default:
            history.push('/settings/kitbags');
            break;
        }
      }
      dispatch({ type: RESET_TOAST });
      dispatch({ type: CLEAR_KITBAG });
      dispatch(editPreferredKitbag({ userId: creator, kitbagId: _id }, {}));
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/kitbags');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const editKitbag = (kitbagId, formValues) => (dispatch) => {
  axios
    .put(`/kitbag/${kitbagId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/kitbag/${kitbagId}`);
      dispatch({ type: EDIT_KITBAG, payload: response.data });
      dispatch(fetchKitbag(kitbagId));
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/kitbags');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const editKitbagCustomisation = (kitbagId, formValues) => (dispatch) => {
  axios
    .put(`/kitbag/${kitbagId}/customisation`, { ...formValues }, {})
    .then((response) => {
      history.push(`/kitbag/${kitbagId}/customisation`);
      dispatch({ type: EDIT_KITBAG, payload: response.data });
      dispatch(fetchKitbag(kitbagId));
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/kitbags');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
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
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/kitbags');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const inviteToKitbag = (kitbagId, email) => (dispatch) => {
  axios
    .put(`/kitbag/${kitbagId}/member/invite/${email}`, {}, {})
    .then((response) => {
      history.push(`/settings/kitbags`);
      dispatch({ type: CREATE_KITBAG_INVITE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/kitbags/${kitbagId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
      history.push(`/settings/kitbags`);
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
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
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
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/settings/kitbags`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const clearKitbag = () => (dispatch) => {
  dispatch({ type: CLEAR_KITBAG });
};
