import memoize from 'lodash/memoize';
import slice from 'lodash/slice';

import Fuse from 'fuse.js';

import { combineReducers } from 'redux';
import { pluginReducer as plugin, genConfiguration } from 'redux-plugin';

import * as types from './types';
import { PLUGIN_NAME, PLUGIN_PREFIX } from './configuration';


const isActive = (state = false, { type }) => {
  switch (type) {
    case types.SELECTOR_ACTIVATED:
      return true;
    case types.SELECTOR_DEACTIVATED:
      return false;
    default:
      return state;
  }
};

const originalOrder = (state = [], { type, payload }) => {
  switch (type) {
    case types.SELECTOR_VALUES_SET:
      return payload.order;
    default:
      return state;
  }
}

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SELECTOR_VALUES_SET:
      return payload.byId;
    default:
      return state;
  }
};

const showing = (state = [], { type, peState }) => {

  if (peState) {
    switch (type) {
      case types.SELECTOR_FILTER_CHANGED:
      case types.SELECTOR_REGISTERED:
      case types.SELECTOR_VALUES_SET: {
        const keys = getSearchKeys(peState);
        const needle = getFilter(peState);
        const order = getOriginalOrder(peState);
        const maximum = getMaximum(peState);
        const haystack = getHaystack({ order, peState });
        const results = search({ haystack, needle, keys });
        if (maximum > 0) {
          return slice(results, 0, results.length < maximum? results.length: maximum);
        }

        return results;
      }
    }
  }

  return state;
};

// Modulo for handling negative integers
const mod = (i, l) => i - (l * Math.floor(i / l));

// Limit check
const lim = (i, l) => i >= l ? l -1: i < 0 ? 0: i;

// Selected processing
const pro = (c, i, l) => c ? mod(i, l): lim(i, l);

const selected = (state = 0, { type, payload, peState }) => {
  if (peState) {
    // console.log(getHaystack.cache);
    // console.log(search.cache);
    const showing = getShowing(peState);
    const circular = getCircular(peState);
    switch (type) {
      case types.SELECTOR_FILTER_CHANGED:
        return 0;
      case types.SELECTOR_SELECTED_CHANGED:
        return pro(circular, payload.selected, showing.length);
      case types.SELECTOR_SELECTED_CHANGED_UP:
        return pro(circular, state + 1, showing.length);
      case types.SELECTOR_SELECTED_CHANGED_DOWN:
        return pro(circular, state - 1, showing.length);
    }
  }

  return state;
};

const filter = (state = '', { type, payload }) => {
  switch (type) {
    case types.SELECTOR_FILTER_CHANGED:
      return payload.filter;
    default:
      return state;
  }
};

const configuration = genConfiguration({
  prefix: PLUGIN_PREFIX,
  defaultConfiguration: {
    searchKeys: [],
    circular: true,
    maximum: 9999
  }
});

const selectorElement = combineReducers({
  isActive,
  originalOrder,
  byId,
  selected,
  filter,
  configuration,
  showing
});

export default plugin({
  name: PLUGIN_NAME,
  prefix: PLUGIN_PREFIX,
  reducer: selectorElement
});

export const getSelctorTree = state => state[PLUGIN_NAME];

// Get plugin element
export const getSelector = (state, id) => state[id];

// Configurations
export const getConfiguration = peState => peState.configuration || {};
export const getSearchKeys = peState => getConfiguration(peState).searchKeys;
export const getCircular = peState => getConfiguration(peState).circular;
export const getMaximum = peState => getConfiguration(peState).maximum;

// Logic state
export const getSelected = peState => peState.selected;
export const getOriginalOrder = peState => peState.originalOrder;
export const getIsActive = peState => peState.isActive;
export const getFilter = peState => peState.filter;
export const getElementById = (peState, id) => ({
  id,
  ...peState.byId[id]
});

// Memoize configuration
memoize.Cache = Map;

// Fuse configuration
const FUSE_OPTIONS = {
  id: 'id',
  shouldSort: true,
  findAllMatches: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1
};

const search = memoize(
  ({ haystack, needle, keys }) =>
    needle.length > 0 && keys.length > 0 ?
      new Fuse(haystack, {
        ...FUSE_OPTIONS,
        keys
      }).search(needle):
      haystack.map(({ id }) => id),
  ({ haystack, needle }) =>
      `${needle}:${ haystack.map(e => e.id) }`
)

const getHaystack = ({ order, peState }) =>
  order.map(key => ({
    id: key,
    ...getElementById(peState, key)
  })
);

export const getShowing = peState => peState.showing;

export const getSelectedElement = peState => getElementById(
  peState,
  getShowing(peState)[getSelected(peState)]
);

// TODO ? redux plugin utility that might be helpful...
// for developers that are willing to get a pure state selector
// instead of plugin element selectors.
// export const pluginSelectors = generatePluginSelectors({
//   getPluginTree: state => state.selector,
//   elementSelectors: {
//     getOriginalOrder,
//     getConfiguration,
//     getSearchKeys,
//     getIsActive,
//     getFilter,
//     getById,
//     getElementById,
//     getShowing,
//     getSelected
//   }
// });
