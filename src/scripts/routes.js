// @flow
import React from 'react';

import { Route/*, browserHistory*/ } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
// import { /*routerActions,*/ syncHistoryWithStore } from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory'
// import { UserAuthWrapper } from 'redux-auth-wrapper'

// import { getUser } from './reducers';

import LoginView from './components/views/login';
import NotFoundView from './components/views/notFound';
import ForbiddenView from './components/views/forbidden';

// const UserIsAuthenticated = UserAuthWrapper({
//   authSelector: getUser,
//   redirectAction: routerActions.replace,
//   failureRedirectPath: '/',
//   wrapperDisplayName: 'UserIsAuthenticated'
// });

const configRouter = (history: Object) => {
  return () =>
    <ConnectedRouter history={ history }>
      <div>
        <Route path="/" component={ LoginView } />
        <Route path="/forbidden" component={ ForbiddenView } />
        <Route path="/not-found" component={ NotFoundView } />
        <Route path="*" component={ NotFoundView } />
      </div>
    </ConnectedRouter>
}

export default configRouter;
