// @flow
import { fork } from 'redux-saga/effects';

import * as api from '../api';

import { sagas as jwtSagas } from 'nozzmo-redux-jwt';
import watchRedirectAfterLogin from './login';
import {
  watchRemoteConfigurationFetch
} from './configurations';

const watchLogin = jwtSagas.genLoginSaga(api.login);

function* mainSaga(): Iterator<any> {
  yield [
    fork(watchLogin),
    fork(watchRedirectAfterLogin),
    fork(watchRemoteConfigurationFetch)
  ];
}

export default mainSaga;
