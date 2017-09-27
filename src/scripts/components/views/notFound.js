// @flow
import React from 'react';

import { Link } from 'react-router-dom';

import { CenteredView } from './viewTypes';

const NotFoundView = () =>
  <CenteredView className="not-found">
    <h1>404 - Recurso no encontrado</h1>
    <Link
      className="button button-danger button-small"
      to="/">Regresar</Link>
  </CenteredView>

export default NotFoundView;
