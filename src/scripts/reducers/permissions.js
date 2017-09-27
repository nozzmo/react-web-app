// @flow
import * as types from '../types/permissions';
import type { PERMISSION_ACTION_TYPE } from '../types/permissions';

export type PermissionsState = Array<string>;

const permissions = (state: PermissionsState = [], action: PERMISSION_ACTION_TYPE): PermissionsState => {
  switch(action.type) {
    case types.PERMISSIONS_ADDED: {
      const { payload } = action;
      return [...state, ...payload];
    }
    case types.PERMISSIONS_CLEARED: {
      return [];
    }
    case types.PERMISSION_REMOVED: {
      const { payload } = action;
      return state.filter(
        cpermission => cpermission !== payload
      );
    }
    default:
      return state;
  }
}

export default permissions;

export const hasPermission = (state: Object, permission: string) => state.includes(permission);
export const getPermissions = (state: Object) => state;
