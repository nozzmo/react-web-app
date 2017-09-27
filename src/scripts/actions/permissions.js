// @flow
import * as types from '../types/permissions';
import type {
  PERMISSIONS_ADDED_TYPE,
  PERMISSION_REMOVED_TYPE,
  PERMISSIONS_CLEARED_TYPE
} from '../types/permissions';

export const addPermissions = (permStrings: Array<string>): PERMISSIONS_ADDED_TYPE => ({
  type: types.PERMISSIONS_ADDED,
  payload: permStrings
});

export const removePermission = (permString: string): PERMISSION_REMOVED_TYPE => ({
  type: types.PERMISSION_REMOVED,
  payload: permString
});

export const clearPermissions = (): PERMISSIONS_CLEARED_TYPE => ({
  type: types.PERMISSIONS_CLEARED
});
