import * as types from './types';

export const register = (id, { isActive, byId, originalOrder = [], selected, filter, configuration = {} }) => ({
  type: types.SELECTOR_REGISTERED,
  payload: {
    id,
    isActive,
    byId,
    originalOrder,
    selected,
    filter,
    configuration
  }
});

export const attach = id => ({
  type: types.SELECTOR_ATTACHED,
  payload: { id }
});

export const activate = (id, selected) => ({
  type: types.SELECTOR_ACTIVATED,
  payload: {
    id
  }
});

export const deactivate = (id, selected) => ({
  type: types.SELECTOR_DEACTIVATED,
  payload: {
    id
  }
});

export const setValues = (id, byId, order) => ({
  type: types.SELECTOR_VALUES_SET,
  payload: {
    id,
    byId,
    order
  }
});

export const changeSelected = (id, selected) => ({
  type: types.SELECTOR_SELECTED_CHANGED,
  payload: {
    id,
    selected
  }
});

export const changeSelectedUp = id => ({
  type: types.SELECTOR_SELECTED_CHANGED_UP,
  payload: { id }
});

export const changeSelectedDown = id => ({
  type: types.SELECTOR_SELECTED_CHANGED_DOWN,
  payload: { id }
});

export const changeFilter = (id, filter) => ({
  type: types.SELECTOR_FILTER_CHANGED,
  payload: {
    id,
    filter
  }
});
