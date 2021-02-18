import {
  FETCH_GROUPS,
  FETCH_GROUP,
  FETCH_GROUP_MEMBERS,
  LOGOUT,
  CREATE_GROUP,
  EDIT_GROUP,
  SEARCH_GROUPS,
  FETCH_GROUPS_MEMBER_REQUESTS,
  CREATE_GROUP_JOIN,
  RESET,
  DELETE_GROUP_MEMBER,
  EDIT_GROUP_MEMBER_STATE,
} from '../actions/types';

const initialState = {
  entities: {},
  memberEntities: {},
  search: { searchfor: '', by: '', page: 1, pagesize: 24, loading: true },
  memberRequests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_GROUPS: {
      return { ...state, search: action.payload };
    }

    case FETCH_GROUPS: {
      const { groups } = action.payload.data;
      let entities = {};
      groups.forEach((group) => {
        entities[group._id] = { ...group };
      });
      return { ...state, entities };
    }

    case FETCH_GROUP_MEMBERS: {
      const { members } = action.payload.data.members;
      let memberEntities = {};
      members.forEach((member) => {
        memberEntities[member._id] = { ...member };
      });
      return { ...state, memberEntities };
    }

    case FETCH_GROUP:
    case CREATE_GROUP:
    case CREATE_GROUP_JOIN:
    case EDIT_GROUP: {
      const group = action.payload.data;
      const groupId = group._id;
      const entities = { ...state.entities, [groupId]: group };
      return { ...state, entities, memberEntities: {} };
    }

    case EDIT_GROUP_MEMBER_STATE: {
      const member = action.payload.data;
      const memberId = member._id;
      const memberEntities = { ...state.memberEntities, [memberId]: member };
      return { ...state, memberEntities };
    }

    case DELETE_GROUP_MEMBER: {
      const memberId = action.payload;
      // eslint-disable-next-line no-unused-vars
      const { [memberId]: value, ...otherEntities } = state.memberEntities;
      return { ...state, memberEntities: otherEntities };
    }

    case FETCH_GROUPS_MEMBER_REQUESTS: {
      return { ...state, memberRequests: action.payload.data };
    }

    case RESET:
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
