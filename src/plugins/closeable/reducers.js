import { combineReducers } from 'redux';
import { pluginReducer as plugin, genConfiguration } from 'redux-plugin';

import * as types from './types';

import { PLUGIN_NAME, PLUGIN_PREFIX } from './configuration';


const isOpen = (state = false, { type, payload, peState }) => {

  if (type === types.CLOSEABLE_GROUPS_CLOSED ||
    type === types.CLOSEABLE_GROUPS_OPENED) {
    const { groupsToClose } = payload;
    const { groups } = peState;
    let ownGroupsSet = new Set(groups);
    let intersection = new Set(groupsToClose.filter(i =>
      ownGroupsSet.has(i)));

    if (intersection.size > 0) {
      return type === types.CLOSEABLE_GROUPS_OPENED;
    }

    return state;
  }

  switch (type) {
    case types.CLOSEABLE_OPENED:
      return true;
    case types.CLOSEABLE_CLOSED:
    case types.CLOSEABLE_ALL_CLOSED:
      return false;
    default:
      return state;
  }
}

const groups = (state = [], { type, payload }) => {
  switch (type) {
    case types.CLOSEABLE_GROUP_ADDED:
      return [ ...state, payload.groupName ];
    case types.CLOSEABLE_GROUP_REMOVED:
      return state.filter(group => group !== payload.groupName);
    case types.CLOSEABLE_ALL_GROUPS_CLEARED:
      return [];
    default:
      return state;
  }
}

const configuration = genConfiguration({
  prefix: PLUGIN_PREFIX
});

const closeableElement = combineReducers({
  isOpen,
  groups,
  configuration
});

const closeable = plugin({
  name: PLUGIN_NAME,
  prefix: PLUGIN_PREFIX,
  reducer: closeableElement
});

export default closeable;

export const getCloseable = (state, id) => state[id];
export const getConfiguration = peState => peState.configuration;
export const getIsOpen = peState => peState.isOpen;
export const getGroups = peState => peState.groups;
export const getMembership = peState => group => getGroups(peState).includes(group);
