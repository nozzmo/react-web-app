import isEmptyObject from 'is-empty-object';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { close, open } from '../actions';
import { getIsOpen } from '../reducers';

import React from 'react';
import { findDOMNode } from 'react-dom';

import { hoTransform } from '../utils';

import { POPOVER_DIRECTIONS } from '../constants';

import { TipRail } from './tip';

// Transform horizontal direction
export const thd = hoTransform({
  array: POPOVER_DIRECTIONS.horizontal,
  defaultElement: 'center'
});

// Transform vertical direction
export const tvd = hoTransform({
  array: POPOVER_DIRECTIONS.vertical,
  defaultElement: 'top'
});

const getOffsetClass = ({ offset, tver, thor }) => (
  typeof offset !== 'undefined' ?
    (
      ((
        ['above', 'below'].includes(tver) &&
        ['left', 'right'].includes(thor)
      ) || (
        ['before', 'after'].includes(thor) &&
        ['top', 'bottom'].includes(tver)
      )) ? `offset-${ offset }`: ''
    ): ''
);


class Popover extends React.Component {

  updateBox() {
    const rect = findDOMNode(this).getBoundingClientRect();
    this.setState({
      repositioning: false,
      boxTop: rect.top,
      boxLeft: rect.left,
      boxWidth: rect.width,
      boxHeight: rect.height
    });
  }

  componentWillMount() {
    this.setState({
      repositioning: true,
      boxTop: 0,
      boxLeft: 0,
      boxWidth: 0,
      boxHeight: 0
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateBox();
    const { isOpen } = nextProps;
    this.handleUpdateBox = debounce(() => {
      this.updateBox();
    }, 100);

    if (isOpen) {
      if(typeof this.handleScroll === 'undefined') {
        this.handleScroll = () => {
          this.setState({ ...this.state, repositioning: true });
          this.handleUpdateBox();
        }
      }

      window.addEventListener(
        'scroll',
        this.handleScroll);
      window.addEventListener(
        'resize',
        this.handleScroll)
    } else {
      window.removeEventListener(
        'scroll',
        this.handleScroll);
      window.removeEventListener(
        'resize',
        this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      this.handleScroll);
    window.removeEventListener(
      'resize',
      this.handleScroll);
  }

  render() {
    const {
      at,
      isOpen = false,
      hasTip = true,
      boundaryClassName = '',
      className = '',
      vertical,
      horizontal,
      tipPosition,
      offset,
      Content = () => null,
      onChildrenClick = e => e,
      children
    } = this.props;

    if (typeof at === 'undefined' || isEmptyObject(at)) {
      const tver = tvd(vertical);
      const thor = thd(horizontal);

      return (
        <div className={ `popover-bounds ${boundaryClassName}` }>
          <span onClick={ onChildrenClick }>{ children }</span>
          {
            isOpen && (
              <div
                className={ `popover-floating-box ${ this.state.repositioning? 'repositioning': '' }` }
                // onClick={ onChildrenClick }
                style={ {
                  left: this.state.boxLeft,
                  top: this.state.boxTop,
                  width: this.state.boxWidth,
                  height: this.state.boxHeight
                } }>
                <div className={
                  'popover' +
                  ` ${ thor }` +
                  ` ${ tver }` +
                  ` ${ className }` +
                  ` ${ hasTip ? 'with-tip': '' }` +
                  ` ${ getOffsetClass({ offset, tver, thor }) }`
                  }>
                  <Content />
                </div>
                {
                  hasTip && (
                    ['above', 'below'].includes(tver) ?
                    <TipRail
                      vertical={ tver }
                      horizontal={ tipPosition } />:
                    ['before', 'after'].includes(thor) ?
                      <TipRail
                        isHorizontal={ false }
                        vertical={ tipPosition }
                        horizontal={ thor } />:
                      ''
                  )
                }
              </div>
            )
          }
        </div>
      );
    } else {
      // TODO: globally positioned popover
    }
  }

  handleClickOutside() {
    const { onClickOutside } = this.props;
    if (onClickOutside) {
      onClickOutside();
    }
  }
}

Popover = onClickOutside(Popover)

export default Popover;

export const ClickPopover = connect(
  undefined,
  (dispatch, { id, peState, closeOnOut }) => ({
    onChildrenClick: () => getIsOpen(peState) ?
      dispatch(close(id)): dispatch(open(id)),
    onClickOutside: () => closeOnOut && getIsOpen(peState) ?
      dispatch(close(id)): null
  })
)(Popover);

