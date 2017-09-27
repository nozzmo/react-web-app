import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import { ReduxClickPopover } from '../closeable'
import { 
  ReduxSelector,
  ReduxSelectorFilter,
  ReduxSelectorSelected } from '../selector';

import { changeSelected, activate, deactivate } from '../selector/actions';
import { close } from '../closeable/actions';


const DefaultSelectedComponent = ( {title, buttonType = 'primary' }) => (
  <div className="pop-selector-selected buttons two with-context block">
    <button className={ `button block button-${ buttonType } left-end` }>{ title }</button>
    <button className={ `button button-${ buttonType } right-end only-icon` }>
      <i className="fa fa-chevron-down"></i>
    </button>
  </div>
);

const DefaultPopSelectorResult = ({ title, isSelected, onClick }) => (
  <div
    onClick={ onClick }
    className={ `pop-selector-result ${ isSelected ? 'selected': '' }`}>
    { title }
  </div>
);

class PopSelectorContainer extends React.Component {
  componentWillMount() {
    this.setState({
      checkVisibility: false
    });

  }

  componentWillUnmount() {
    this.props.afterUnmount();
    this.setState({
      checkVisibility: false
    });
  }

  componentDidMount() {
    this.props.afterMount();;
    this.setState({
      container: findDOMNode(this),
      checkVisibility: true
    });
  }

  render() {
    const { ElementComponent, id, close, changeSelected } = this.props;
    return (
      <div className="pop-selector-container">
        <ReduxSelector
          id={ id }
          ElementComponent={ ElementComponent }
          onActivateElement={ (element, position) => {
            close(id);
            changeSelected(id, position);
          } }
          { ...this.state }
        />
      </div>
    );
  }
}

class PopSelector extends React.Component {
  render() {
    const {
      contentClass,
      SelectedComponent = DefaultSelectedComponent,
      ElementComponent =  DefaultPopSelectorResult,
      buttonType,
      id,
      initialState,
      close,
      changeSelected,
      filterPlaceholder,
      afterSelectorMount,
      afterSelectorUnmount,
      className
    } = this.props;

    const { popover, selector } = initialState;
    class PopSelectorContent extends React.Component {
      componentDidMount() {
        const node = findDOMNode(this);
        const inputs = node.getElementsByTagName('input');
        if (inputs.length > 0) {
          inputs[0].focus();
        }
      }


      render() {
        return (
          <div className={ `pop-selector-content ${ contentClass }`}>
            <ReduxSelectorFilter
              id={ id }
              placeholder={ filterPlaceholder } />
            <PopSelectorContainer
              id={ id }
              ElementComponent={ ElementComponent }
              close={ close }
              changeSelected={ changeSelected }
              afterMount={ afterSelectorMount }
              afterUnmount={ afterSelectorUnmount } />
          </div>
        );
      } 
    }

    // console.log(id);

    return (
      <div className={`pop-selector ${ className }`}>
        <ReduxClickPopover
          id={ id }
          initialState={ popover }
          Content={ PopSelectorContent }
          closeOnOut={ true }>
          <ReduxSelectorSelected
            id={ id }
            Content={ SelectedComponent }
            initialState={ selector }
            buttonType={ buttonType } />
        </ReduxClickPopover>
      </div>
    );
  }
}

PopSelector = connect(
  state => ({}),
  (dispatch, ownProps) => ({
    close: id => dispatch(close(id)),
    changeSelected: (id, position) => dispatch(changeSelected(id, position)),
    afterSelectorMount: () => dispatch(activate(ownProps.id)),
    afterSelectorUnmount: () => dispatch(deactivate(ownProps.id))
  })
)(PopSelector);

export default PopSelector;