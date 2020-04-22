import axios from 'axios';
import { getHeaders, updateTokens } from '../helpers/ykbApi';
import {
  FETCH_GROUPS,
  CREATE_GROUP,
  FETCH_GROUP,
  EDIT_GROUP,
  EDIT_GROUP_STATUS,
  DELETE_GROUP_MEMBER,
  FETCH_GROUP_MEMBERS,
  EDIT_GROUP_MEMBER_STATE,
  API_KITBAG_ERROR,
  GETALL_FAILURE,
  CREATE_GROUP_JOIN,
  EDIT_GROUP_LEAVE,
  SEARCH_GROUPS,
  SEARCH_GROUP_MEMBERS,
  FETCH_GROUPS_MEMBER_REQUESTS,
} from './types';
import history from '../helpers/history';
import { getUser } from './UserActions';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchGroups = (
  searchfor = '',
  by = '',
  page = 1,
  pagesize = 24
) => (dispatch) => {
  axios
    .get(`${baseUrl}/group/search`, {
      params: { searchfor, by, page, pagesize },
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_GROUPS, payload: response.data });
      dispatch({
        type: SEARCH_GROUPS,
        payload: { searchfor, by, page, pagesize },
      });
      history.push(
        `/groups?searchfor=${searchfor}&by=${by}&page=${page}&pagesize=${pagesize}`
      );
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const fetchGroup = (groupId) => (dispatch) => {
  axios
    .get(`${baseUrl}/group/${groupId}`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_GROUP, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createGroup = (formValues) => (dispatch) => {
  axios
    .post(
      `${baseUrl}/group`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push('/groups?searchfor=&by=&page=1&pagesize=24');
      dispatch({ type: CREATE_GROUP, payload: response.data });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          '/auth/login?return=/groups?searchfor=&by=&page=1&pagesize=24'
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editGroup = (groupId, formValues) => (dispatch) => {
  axios
    .put(
      `${baseUrl}/group/${groupId}`,
      { ...formValues },
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push('/groups');
      dispatch({ type: EDIT_GROUP, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editGroupStatus = (groupId, status) => (dispatch) => {
  axios
    .put(
      `${baseUrl}/group/${groupId}/status`,
      { status: status },
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push('/groups?searchfor=&by=&page=1&pagesize=24');
      dispatch({ type: EDIT_GROUP_STATUS, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(
          '/auth/login?return=/groups?searchfor=&by=&page=1&pagesize=24'
        );
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchGroupMembers = (searchfor, by, groupId) => (dispatch) => {
  axios
    .get(`${baseUrl}/group/${groupId}/members`, {
      params: { searchfor, by },
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_GROUP_MEMBERS, payload: response.data });
      dispatch({
        type: SEARCH_GROUP_MEMBERS,
        payload: { searchfor, by },
      });
      history.push(
        `/groups/${groupId}/members?searchfor=${searchfor}&by=${by}`
      );
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/groups/${groupId}/members`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const editGroupMemberState = (groupId, memberId, state) => (
  dispatch
) => {
  axios
    .put(
      `${baseUrl}/group/${groupId}/members/${memberId}/${state}`,
      {},
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/groups/${groupId}/members`);
      dispatch({ type: EDIT_GROUP_MEMBER_STATE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/groups/${groupId}/members`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const deleteGroupMember = (groupId, memberId) => (dispatch) => {
  axios
    .delete(`${baseUrl}/group/${groupId}/members/${memberId}/delete`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/groups/${groupId}/members`);
      dispatch({ type: DELETE_GROUP_MEMBER, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/groups/${groupId}/members`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const requestGroupJoin = (groupId) => (dispatch) => {
  axios
    .post(
      `${baseUrl}/group/${groupId}/members/join`,
      {},
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/groups/${groupId}`);
      dispatch({ type: CREATE_GROUP_JOIN, payload: response.data });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/groups/${groupId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
      history.push(`/groups/${groupId}`);
    });
};

export const requestGroupLeave = (groupId) => (dispatch) => {
  axios
    .put(
      `${baseUrl}/group/${groupId}/members/leave`,
      {},
      {
        headers: getHeaders(),
      }
    )
    .then((response) => {
      updateTokens(response.headers);
      history.push(`/groups/${groupId}`);
      dispatch({ type: EDIT_GROUP_LEAVE, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/groups/${groupId}`);
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchGroupsMemberRequests = () => (dispatch) => {
  axios
    .get(`${baseUrl}/groups/memberrequests`, {
      headers: getHeaders(),
    })
    .then((response) => {
      updateTokens(response.headers);
      dispatch({ type: FETCH_GROUPS_MEMBER_REQUESTS, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};
