import axios from '../utils/axios';
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
import history from '../utils/history';
import { getUser } from './UserActions';

export const fetchGroups = ({ by, searchfor, page, pagesize, pushHistory }) => (
  dispatch
) => {
  axios
    .get(`/group/search`, {
      params: { searchfor, by, page, pagesize },
    })
    .then((response) => {
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
    .get(`/group/${groupId}`, {})
    .then((response) => {
      dispatch({ type: FETCH_GROUP, payload: response.data });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const createGroup = (formValues) => (dispatch) => {
  axios
    .post(`/group`, { ...formValues }, {})
    .then((response) => {
      history.push('/groups');
      dispatch({ type: CREATE_GROUP, payload: response.data });
      dispatch(getUser());
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/groups');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const editGroup = (groupId, formValues) => (dispatch) => {
  axios
    .put(`/group/${groupId}`, { ...formValues }, {})
    .then((response) => {
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
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const editGroupStatus = (groupId, status) => (dispatch) => {
  axios
    .put(`/group/${groupId}/status`, { status: status }, {})
    .then((response) => {
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
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const fetchGroupMembers = ({
  by,
  searchfor,
  page,
  pagesize,
  order,
  direction,
  groupId,
  pushHistory,
}) => (dispatch) => {
  axios
    .get(`/group/${groupId}/members`, {
      params: { by, searchfor, page, pagesize, order, direction },
    })
    .then((response) => {
      dispatch({ type: FETCH_GROUP_MEMBERS, payload: response.data });
      if (pushHistory) {
        dispatch({
          type: SEARCH_GROUP_MEMBERS,
          payload: { searchfor, by },
        });
        history.push(
          `/groups/${groupId}/members?searchfor=${searchfor}&by=${by}&page=${page}&pagesize=${pagesize}&order=${order}&direction=${direction}`
        );
      }
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
    .put(`/group/${groupId}/members/${memberId}/${state}`, {}, {})
    .then((response) => {
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
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const deleteGroupMember = (groupId, memberId) => (dispatch) => {
  axios
    .delete(`/group/${groupId}/members/${memberId}/delete`, {})
    .then((response) => {
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
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const requestGroupJoin = (groupId) => (dispatch) => {
  axios
    .post(`/group/${groupId}/members/join`, {}, {})
    .then((response) => {
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
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
      history.push(`/groups/${groupId}`);
    });
};

export const requestGroupLeave = (groupId) => (dispatch) => {
  axios
    .put(`/group/${groupId}/members/leave`, {}, {})
    .then((response) => {
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
      dispatch({ type: API_KITBAG_ERROR, payload: response.data });
    });
};

export const fetchGroupsMemberRequests = () => (dispatch) => {
  axios
    .get(`/groups/memberrequests`, {})
    .then((response) => {
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
