import { combineReducers } from 'redux';

import { pluginReducer as plugin } from 'redux-plugin';

import * as types from './types';
import { PLUGIN_NAME, PLUGIN_PREFIX } from './configuration';


const height = (state = '100vh', { type, payload }) => {
  switch (type) {
    case types.COLLAPSABLE_CHANGED:
      return payload.height;
    default:
      return state;
  }
}

const collapsableElement = combineReducers({
  height
});


const collapsable = plugin({
  name: PLUGIN_NAME,
  prefix: PLUGIN_PREFIX,
  reducer: collapsableElement
});

export default collapsable;

export const getCollapsable = (state, id) => state[id];
export const getHeight = peState => peState.height;
