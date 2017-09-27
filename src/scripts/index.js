// @flow
import '../styles/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configRouter from './routes';
import configureStore from './store/configureStore';

const storePromise = configureStore();

storePromise.then(({ store, history }) => {
  const Router = configRouter(history);

  ReactDOM.render(
    <Provider store={ store }>
      <Router />
    </Provider>,
    document.getElementById("root")
  );
});
