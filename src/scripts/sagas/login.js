// @flow
import flattenDeep from 'lodash/flattenDeep';
import { call, takeEvery, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { types as jwtTypes } from 'nozzmo-redux-jwt';

import { User } from '../api';
import { addPermissions } from '../actions';
import { arrayOfGroups } from '../api/schemas';
import * as selectors from '../reducers';


function* redirectAfterLogin({ payload: { decoded, token } }) {
  const response = yield call([User, 'groups'], { id: decoded.user_id, token });
  let { entities: { groups, permissions }, result } = normalize(
    response,
    arrayOfGroups);
  const permStrings = flattenDeep(
    result.map(
      id => groups[id]).map(
      group => group.permissions
    )
  ).map(id => permissions[id].codename);

  yield put(addPermissions(permStrings));
  if (yield select(selectors.hasPermission, 'add_bookpackage')) {
    yield put(push('admin'));
  } else {
    yield put(push('downloader'));
  }
}

function* watchRedirectAfterLogin(): Iterator<any> {
  yield takeEvery(jwtTypes.LOGIN_SUCCEED, redirectAfterLogin);
}

export default watchRedirectAfterLogin;
