// @flow
import * as types from '../types/configurations';
import type { CONFIGURATION_ACTION_TYPE } from '../types/configurations';

export type ConfigurationsState = {[string]: string};

const configurations =  (
  state: ConfigurationsState = {},
  action: CONFIGURATION_ACTION_TYPE): ConfigurationsState => {
  switch (action.type) {
    case types.CONFIGURATION_SET: {
      const { payload: { key, value } } = action;
      return {
        ...state,
        [key]: value
      };
    }
    case types.CONFIGURATION_CLEARED: {
      const { payload } = action;
      const newState = { ...state };
      delete newState[payload];
      return newState;
    }
    default:
      return state;
  }
}

export default configurations;

export const getConfiguration = (state: Object, key: string) => state[key];
