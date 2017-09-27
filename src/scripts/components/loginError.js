// @flow
import React from 'react';
import { connect } from 'react-redux';

import { getLoginError } from '../reducers';


let LoginError = ({ loginError }) => (
    <div>
      {
        loginError &&
        <div className="login-error">
          { loginError }
        </div>
      }
    </div>
  );

LoginError = connect(
  state => ({
    loginError: getLoginError(state)
  })
)(LoginError);

export default LoginError;
