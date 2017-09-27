import * as types from './types';

export const register = (id, { isOpen = false, groups = [], configuration }) => ({
  type: types.CLOSEABLE_REGISTERED,
  payload: { id, isOpen, groups, configuration }
});

export const attach = id => ({
  type: types.CLOSEABLE_ATTACHED,
  payload: { id }
});

export const open = (id) => ({
  type: types.CLOSEABLE_OPENED,
  payload: { id }
});

export const close = (id) => ({
  type: types.CLOSEABLE_CLOSED,
  payload: { id }
});

export const addGroup = (id, groupName) => ({
  type: types.CLOSEABLE_GROUP_ADDED,
  payload: { id, groupName }
});

export const removeGroup = (id, groupName) => ({
  type: types.CLOSEABLE_GROUP_REMOVED,
  payload: { id, groupName }
});

export const clearGroups = (id) => ({
  type: types.CLOSEABLE_ALL_GROUPS_CLEARED,
  payload: { id }
});

// Plugin Actions

export const closeGroups = (groupsToClose) => ({
  type: types.CLOSEABLE_GROUPS_CLOSED,
  payload: { groupsToClose }
});

export const closeAll = () => ({
  type: types.CLOSEABLE_ALL_CLOSED,
  payload: {}
});
