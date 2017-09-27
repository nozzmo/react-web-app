// @flow
import React from 'react';

import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import { actions as jwtActions } from 'nozzmo-redux-jwt';

import * as selectors from '../reducers';
import { RenderInput } from './forms';

const triggerLogin = (values, dispatch) =>
  dispatch(jwtActions.startLogin(values.username, values.password));

const validate = values => {
  let errors = {};

  if(!values.username)
    errors.username = "Requerido";

  if(!values.password)
    errors.password = "Requerido";

  return errors;
}

let LoginForm = ({ handleSubmit, isLoading }) =>
  <form onSubmit={ handleSubmit }>
    <Field
      name="username"
      component={ RenderInput }
      placeholder="Usuario"
      autoFocus={ true }
      type="text" />
    <Field
      name="password"
      component={ RenderInput }
      placeholder="Contraseña"
      type="password" />

    <button className={"button button-primary block" + (isLoading ? ' loading': '') }>
      <span className="loader">
        <span className="o"></span>
      </span>

      <span className="text">Ingresar</span>
    </button>
  </form>


LoginForm = reduxForm({
  form: 'loginForm',
  onSubmit: triggerLogin,
  validate
})(LoginForm);

LoginForm = connect(
  state => ({
    isLoading: selectors.getLoginIsLoading(state)
  })
)(LoginForm);

export default LoginForm;
