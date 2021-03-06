// @flow

export type CONFIGURATION_SET_TYPE = {
  type: 'CONFIGURATION_SET',
  payload: {
    key: string,
    value: any
  }
};
export const CONFIGURATION_SET = 'CONFIGURATION_SET';

export type CONFIGURATION_CLEARED_TYPE = {
  type: 'CONFIGURATION_CLEARED',
  payload: string
};
export const CONFIGURATION_CLEARED = 'CONFIGURATION_CLEARED';

export type REMOTE_CONFIGURATION_FETCHED_TYPE = {
  type: 'REMOTE_CONFIGURATION_FETCHED',
  payload: string
};
export const REMOTE_CONFIGURATION_FETCHED = 'REMOTE_CONFIGURATION_FETCHED';

export type CONFIGURATION_ACTION_TYPE =
  | CONFIGURATION_SET_TYPE
  | CONFIGURATION_CLEARED_TYPE
  | REMOTE_CONFIGURATION_FETCHED_TYPE
