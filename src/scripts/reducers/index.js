// @flow
import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as auth, selectors as fromAuth } from 'nozzmo-redux-jwt';

import { genSelector } from '../utils';

// import collapsable from '../../plugins/collapsable/reducers';
// import selector from '../../plugins/selector/reducers';
// import closeable from '../../plugins/closeable/reducers';

import login, * as fromLogin from './login';
import permissions, * as fromPermissions from './permissions';

import configurations, * as fromConfigurations from './configurations';

const reducer = combineReducers({
  router: routerReducer,
  form,
  auth,
  login,
  configurations,
  // collapsable,
  // closeable,
  // selector,
  permissions,
});

export default reducer;

export const getLoginIsLoading = (state: Object) => fromLogin.getIsLoading(state.login);
export const getLoginError = (state: Object) => {
  const { non_field_errors } = fromAuth.getErrorExtra(state.auth);

  if(non_field_errors && non_field_errors.length > 0)
    return non_field_errors[0];

  return undefined;
}

export const getIsAuth = (state: Object) => fromAuth.getIsAuth(state.auth);
export const getUsername = (state: Object) => fromAuth.getDecoded(state.auth).username;
export const getUserId = (state: Object) => fromAuth.getDecoded(state.auth).user_id;
export const getUserEmail = (state: Object) => fromAuth.getDecoded(state.auth).email;
export const getUser = (state: Object) => fromAuth.getDecoded(state.auth);

export const hasPermission = genSelector(fromPermissions.hasPermission, 'permissions');
export const getPermission = genSelector(fromPermissions.getPermissions, 'permissions');

export const getConfiguration = genSelector(fromConfigurations.getConfiguration, 'configurations');
