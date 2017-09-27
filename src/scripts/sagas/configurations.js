// @flow
import { call, takeEvery, put } from 'redux-saga/effects';
// import { normalize } from 'normalizr';

import { REMOTE_CONFIGURATION_FETCHED } from '../types/configurations';
// import * as selectors from '../reducers';
import { setConfiguration } from '../actions/configurations';

import { Configurations } from '../api';
// import { arrayOfConfigurations } from '../api/schemas';


function* fetchConfiguration({ payload }) {
  const response = yield call([
    Configurations, 'list'
  ], { filters: { key: payload } });

  for(const { key, value } of response.results) {
    yield put(setConfiguration(key, value));
  }
}


export function* watchRemoteConfigurationFetch(): Iterator<any> {
  yield takeEvery(
    REMOTE_CONFIGURATION_FETCHED,
    fetchConfiguration);
}
