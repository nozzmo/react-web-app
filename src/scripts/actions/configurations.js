// @flow
import * as types from '../types/configurations';
import type {
  CONFIGURATION_SET_TYPE,
  REMOTE_CONFIGURATION_FETCHED_TYPE
} from '../types/configurations';

export const setConfiguration = (key: string, value: string): CONFIGURATION_SET_TYPE => ({
  type: types.CONFIGURATION_SET,
  payload: {
    key,
    value
  }
});
export const startRemoteConfigurationFetch = (key:string): REMOTE_CONFIGURATION_FETCHED_TYPE => ({
  type: types.REMOTE_CONFIGURATION_FETCHED,
  payload: key
});
