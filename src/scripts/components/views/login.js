// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getIsAuth, hasPermission } from '../../reducers';

import { push } from 'react-router-redux';

import { CenteredView } from './viewTypes';

import LoginForm from '../loginForm';
import LoginError from '../loginError';


const LoginView = () =>
  <CenteredView className="login">
    <div className="login__form-container">
      <LoginError />
      <LoginForm />
    </div>
  </CenteredView>

type LoginPropTypes = {
  isAuthenticated: boolean,
  handleAuthenticated: boolean => void,
  isAdmin: boolean
}

class Login extends React.Component<LoginPropTypes> {
  componentDidMount() {
    const {
      isAuthenticated,
      handleAuthenticated,
      isAdmin } = this.props;

    if(isAuthenticated)
      handleAuthenticated(isAdmin);
  }

  render() {
    return <LoginView />;
  }
}

export default connect(
  state => ({
    isAuthenticated: getIsAuth(state),
    isAdmin: hasPermission(state, 'add_bookpackage')
  }),
  dispatch => ({
    handleAuthenticated(isAdmin) {
      if(isAdmin) {
        dispatch(push('admin'));
      } else {
        dispatch(push('downloader'))
      }
    }
  })
)(Login);
