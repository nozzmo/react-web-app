import * as types from './types';


export const register = (id, { height }) => ({
  type: types.COLLAPSABLE_REGISTERED,
  payload: {
    id,
    height
  }
});

export const change = (id, height) => ({
  type: types.COLLAPSABLE_CHANGED,
  payload: {
    id,
    height
  }
});
