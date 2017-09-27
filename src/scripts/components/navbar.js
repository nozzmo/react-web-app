// @flow
import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import { Link } from 'react-router';

import { ReduxClickPopover } from '../../plugins/closeable';

import * as selectors from '../reducers';
// import * as actions from '../actions';
import { actions as authActions } from 'nozzmo-redux-jwt';

type NavbarType = {
  onLoad: Function,
  username: string,
  onSignOut: Function
};

class Navbar extends React.Component<NavbarType> {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    const { username, onSignOut } = this.props;
    return (
      <div className="navbar">
        <div className="navbar__element navbar__element--pull-right navbar__username">
          { username }

          <ReduxClickPopover
            id="settingsPopover"
            initialState={ {
              isOpen: false,
              configuration: {
                hasTip: true,
                vertical: 'below',
                horizontal: 'right',
                tipPosition: 'center',
                offset: 10
              }
            } }
            Content={ () =>
              <a onClick={ e => onSignOut(e) } className="navbar__sign-out">
                Cerrar sesión
              </a>
            }
            closeOnOut={ true }>
            <i className="fa fa-chevron-down"></i>
          </ReduxClickPopover>
        </div>
      </div>
    );
  }
}

export const DownloaderNavbar = connect(
  state => ({
    schoolName: selectors.getConfiguration(state, 'school-name'),
    username: selectors.getUsername(state)
  }),
  dispatch => ({
    onLoad() {dispatch({dummy: true})},
    onSignOut() {
      dispatch(authActions.logout());
      // dispatch(actions.clearPermissions());
      localStorage.clear();
      dispatch(push('/'));
    }
  })
)(Navbar);
