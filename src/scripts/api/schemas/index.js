// @flow
import { schema } from 'normalizr';

export const group = new schema.Entity('groups');
export const arrayOfGroups = new schema.Array(group);

export const permission = new schema.Entity('permissions');
export const arrayOfPermissions = new schema.Array(permission);
