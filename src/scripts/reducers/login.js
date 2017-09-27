// @flow
import { combineReducers } from 'redux';

import { types as authTypes } from 'nozzmo-redux-jwt';

type LoginStateType = boolean;

type LOGIN_TYPE = {
  type: string
}

const loginIsLoading = (
  state: LoginStateType = false,
  action: LOGIN_TYPE): LoginStateType => {
  switch(action.type) {
    case authTypes.LOGIN_STARTED:
      return true;
    case authTypes.LOGIN_SUCCEED:
    case authTypes.LOGIN_FAILED:
      return false;
    default:
      return state;
  }
}

const login = combineReducers({
  isLoading: loginIsLoading
});

export default login;

export const getIsLoading = (state: Object) => state.isLoading;

// export type StateType = {
//   isLoading: boolean
// }
