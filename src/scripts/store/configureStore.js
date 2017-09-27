// @flow
import { createStore, applyMiddleware, compose } from 'redux';

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import {
  persistStore,
  autoRehydrate,
  createTransform
} from 'redux-persist';

import mainSaga from '../sagas';
import reducer from '../reducers';

const history = createHistory();
const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

// Remove error field from persisted auth substate
let authTransform = createTransform(
  (inboundState, key) =>
    key === 'auth' ?
      { ...inboundState, error: undefined }:
      inboundState,
  outboundState => outboundState,
  {
    whitelist: [
      'auth',
      'permissions'
    ]
  }
);

const configureStore = (): Promise<*> => {
  let middlewares = [routingMiddleware, sagaMiddleware];
  let composeEnhancers = compose;

  if(process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middlewares),
      autoRehydrate()));

  sagaMiddleware.run(mainSaga);

  return new Promise(resolve => {
    persistStore(
      store, {
        whitelist: ['auth', 'permissions'],
        debounce: 500,
        transforms: [
          authTransform
        ]
      },
      () => resolve({ store, history })
    );
  });
}

export default configureStore;
