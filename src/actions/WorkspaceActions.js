import axios from '../utils/axios';
import {
  CLEAR_WORKSPACE,
  FETCH_WORKSPACE,
  EDIT_WORKSPACE,
  API_WORKSPACE_ERROR,
  GETALL_FAILURE,
  CREATE_WORKSPACE_INVITE,
  EDIT_WORKSPACE_LEAVE,
  FETCH_WORKSPACE_MEMBER,
  DELETE_WORKSPACE_MEMBER,
  EDIT_WORKSPACE_MEMBER,
  FETCH_PREFERRED_WORKSPACE,
  RESET_TOAST,
  LOAD_REQUEST_PHOTOS,
  SET_REQUEST_PHOTOS,
} from './types';
import history from '../utils/history';
import { editProfilePreferredWorkspace, getUser } from './UserActions';

export const fetchPreferredWorkspace = () => (dispatch) => {
  axios
    .get('/workspace/preferred', {})
    .then((response) => {
      dispatch({
        type: FETCH_PREFERRED_WORKSPACE,
        payload: response.data,
      });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/workspace/view');
      }
      if (response.status === 400) {
        history.push('/workspace/join');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const fetchWorkspace = (workspaceId) => (dispatch) => {
  axios
    .get(`/workspace/${workspaceId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_WORKSPACE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/workspace/view');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const fetchWorkspaceName = (workspaceId) => (dispatch) => {
  axios
    .get(`/workspace/${workspaceId}/name`, {})
    .then((response) => {
      dispatch({ type: FETCH_WORKSPACE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/workspace/view');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const createWorkspace = (
  formValues,
  { pushHistory = true, forState } = {}
) => (dispatch) => {
  axios
    .post('/workspace', { ...formValues }, {})
    .then((response) => {
      const { creator, _id } = response.data.data;

      if (pushHistory) {
        switch (forState) {
          case 'invite-team':
            history.push('/workspace/inviteteam');
            break;
          default:
            history.push('/settings/workspaces');
            break;
        }
      }
      dispatch({ type: RESET_TOAST });
      dispatch({ type: CLEAR_WORKSPACE });
      dispatch(
        editProfilePreferredWorkspace({ userId: creator, workspaceId: _id }, {})
      );
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/workspaces');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const editWorkspace = (workspaceId, formValues) => (dispatch) => {
  axios
    .put(`/workspace/${workspaceId}`, { ...formValues }, {})
    .then((response) => {
      history.push(`/workspace/${workspaceId}`);
      dispatch({ type: EDIT_WORKSPACE, payload: response.data });
      dispatch(fetchWorkspace(workspaceId));
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/workspaces');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const editWorkspaceBilling = (workspaceId, formValues) => (dispatch) => {
  axios
    .put(`/workspace/${workspaceId}/billing`, { ...formValues }, {})
    .then((response) => {
      history.push(`/workspace/${workspaceId}/billing`);
      dispatch({ type: EDIT_WORKSPACE, payload: response.data });
      dispatch(fetchWorkspace(workspaceId));
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/workspaces');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const editWorkspaceCustomisation = (workspaceId, formValues) => (
  dispatch
) => {
  axios
    .put(`/workspace/${workspaceId}/customisation`, { ...formValues }, {})
    .then((response) => {
      history.push(`/workspace/${workspaceId}/customisation`);
      dispatch({ type: EDIT_WORKSPACE, payload: response.data });
      dispatch(fetchWorkspace(workspaceId));
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/workspaces');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const editWorkspaceWebhook = (workspaceId, formValues) => (dispatch) => {
  axios
    .put(`/workspace/${workspaceId}/webhook`, { ...formValues }, {})
    .then((response) => {
      dispatch({ type: EDIT_WORKSPACE, payload: response.data });
      dispatch(fetchWorkspace(workspaceId));
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/workspaces');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const inviteToWorkspace = (workspaceId, formValues) => (dispatch) => {
  dispatch({ type: LOAD_REQUEST_PHOTOS, payload: { data: { loading: true } } });
  axios
    .post(`/workspace/${workspaceId}/member/invite`, { ...formValues }, {})
    .then((response) => {
      if (!formValues.getLink) {
        dispatch({ type: CREATE_WORKSPACE_INVITE, payload: response.data });
      }
      dispatch({
        type: SET_REQUEST_PHOTOS,
        payload: {
          data: { link: response.data.data.actionUrl, loading: false },
        },
      });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/workspace/${workspaceId}`);
      }
      history.push(`/workspace/${workspaceId}/members`);
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const requestPhotos = (workspaceId, formValues) => (dispatch) => {
  dispatch({ type: LOAD_REQUEST_PHOTOS, payload: { data: { loading: true } } });
  axios
    .post(
      `/workspace/${workspaceId}/member/requestphotos`,
      { ...formValues },
      {}
    )
    .then((response) => {
      dispatch({
        type: SET_REQUEST_PHOTOS,
        payload: {
          data: { link: response.data.data.actionUrl, loading: false },
          message: response.data.message,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: LOAD_REQUEST_PHOTOS,
        payload: { data: { loading: false } },
      });
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const requestToJoinWorkspace = (email) => (dispatch) => {
  axios
    .post(`/workspace/requesttojoin/${email}`, {}, {})
    .then(() => {
      history.push(`/`);
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
      history.push('/');
    });
};

// this api endpoint has not been implemented yet
export const requestWorkspaceLeave = (workspaceId) => (dispatch) => {
  axios
    .put(`/workspace/${workspaceId}/members/leave`, {}, {})
    .then((response) => {
      history.push('/settings/workspaces');
      dispatch({ type: EDIT_WORKSPACE_LEAVE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/workspaces');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const fetchWorkspaceMember = (
  workspaceId,
  memberId,
  notificationId = ''
) => (dispatch) => {
  axios
    .get(
      `/workspace/${workspaceId}/member/${memberId}?notification=${notificationId}`,
      {}
    )
    .then((response) => {
      dispatch({ type: FETCH_WORKSPACE_MEMBER, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/workspace/view');
      }
      history.push(`/workspace/${workspaceId}/members`);
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const editWorkspaceMember = (
  workspaceId,
  memberId,
  formValues,
  notificationId = ''
) => (dispatch) => {
  axios
    .put(
      `/workspace/${workspaceId}/member/${memberId}?notification=${notificationId}`,
      { ...formValues },
      {}
    )
    .then((response) => {
      history.push(`/workspace/${workspaceId}/members`);
      dispatch({ type: EDIT_WORKSPACE_MEMBER, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/workspace/view');
      }
      history.push(`/workspace/${workspaceId}/members`);
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const deleteWorkspaceMember = (workspaceId, memberId) => (dispatch) => {
  axios
    .delete(`/workspace/${workspaceId}/member/${memberId}`, {})
    .then((response) => {
      history.push(`/workspace/${workspaceId}/members`);
      dispatch({ type: DELETE_WORKSPACE_MEMBER, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/workspace/view');
      }
      history.push(`/workspace/${workspaceId}/members`);
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};

export const deleteWorkspace = ({ workspaceId, formValues }) => (dispatch) => {
  axios
    .put(`/workspace/${workspaceId}/delete`, { ...formValues }, {})
    .then(() => {
      dispatch(getUser());
      history.push('/workspace/join');
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings');
      }
      dispatch({ type: API_WORKSPACE_ERROR, payload: response.data });
    });
};
