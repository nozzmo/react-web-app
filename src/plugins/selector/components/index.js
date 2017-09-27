import keycode from 'keycode';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import {
  changeSelectedUp,
  changeSelectedDown,
  changeFilter } from '../actions';
import {
  getShowing,
  getElementById,
  getSelected,
  getFilter,
  getSelectedElement } from '../reducers';


const jump = ({
  jumpPosition,
  nodeTop,
  nodeHeight,
  containerHeight,
  containerTop
}) => nodeTop - jumpPosition * (containerHeight - nodeHeight) - containerTop;

const onChangeVisibility = ({ container, component, vjp }) =>
  isVisible => {
    if (!isVisible) {
      const node = findDOMNode(component);
      const nodeRect = node.getBoundingClientRect();

      if (container === window) {
        container.scrollTo(
          0,
          container.scrollY + jump({
            jumpPosition: vjp,
            nodeTop: nodeRect.top,
            nodeHeight: node.clientHeight,
            containerHeight: container.innerHeight,
            containerTop: 0
          })
        );
      } else {
        const containerRect = container.getBoundingClientRect();
        container.scrollTop += jump({
          jumpPosition: vjp,
          nodeTop: nodeRect.top,
          nodeHeight: node.clientHeight,
          containerHeight: container.clientHeight,
          containerTop: containerRect.top
        });
      }
    }
  };

class ElementWrapper extends React.Component {
  render() {
    const {
      position,
      id,
      ElementComponent,
      element,
      onActivateElement,
      isSelected,
      container = window,
      checkVisibility,
      viewportJumpPosition = 0.5 } = this.props;

    if (isSelected && checkVisibility) {
      return (
        <VisibilitySensor
          onChange={ onChangeVisibility({
            container,
            component: this,
            vjp: viewportJumpPosition
          }) }
          active={ isSelected }
          intervalCheck={ false }
          containment= { container !== window ? container: undefined } >
          <ElementComponent
            onClick={ e => onActivateElement(element, position) }
            { ...element }
            isSelected={ isSelected } />
        </VisibilitySensor>
      );
    }

    return <ElementComponent
      onClick={ e => onActivateElement(element, position) }
      { ...element }
      isSelected={ isSelected } />;
  }
}


export class Selector extends React.Component {
  generateHandleKeyDown(getProps) {

    return event => {
      const {
        isActive,
        changeSelectedUp,
        changeSelectedDown,
        onActivateElement = (element) => undefined,
        selected,
        elements } = getProps();

      if (isActive) {
        const { keyCode } = event;

        if ([
          keycode('up'),
          keycode('down'),
          keycode('enter')].includes(keyCode)) {
          event.preventDefault();

          switch(event.keyCode) {
            case keycode('up'):
              changeSelectedDown();
              break;
            case keycode('down'):
              changeSelectedUp();
              break;
            case keycode('enter'):
              onActivateElement(elements[selected], selected);
              break;
          }
        }
      }
    }
  }

  componentDidMount() {
    this.handleKeyDown = this.generateHandleKeyDown(() => this.props);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {
      className = '',
      ElementComponent,
      elements,
      onActivateElement = element => undefined,
      selected,
      container,
      viewportJumpPosition,
      isActive,
      checkVisibility = false } = this.props;

    return (
      <div className={ `selector ${ className }` }>
        {
          elements.map(({ id, ...element }, i) => (
            <ElementWrapper
              key={ id }
              position={ i }
              container={ container }
              viewportJumpPosition={ viewportJumpPosition }
              {
                ...{
                  id,
                  ElementComponent,
                  element: { id, ...element},
                  onActivateElement,
                  checkVisibility: isActive? checkVisibility: false,
                  isSelected: selected === i
                }
              }
            />
          ))
        }
      </div>
    );
  }
}

const SelectorFilter = ({
  filter,
  onFilterChange,
  focus = false,
  placeholder = ''
}) => (
  <div className="selector-filter">
    <input
      type="text"
      value={ filter }
      placeholder={ placeholder }
      onChange={ ({ target: { value } }) => onFilterChange(value) }
    />
  </div>
);

const SelectorSelected = ({ Content, selectedElement, ...rest }) => (
  <Content { ...selectedElement } { ...rest } />
);

export const PluginSelectorFilter = connect(
  (state, { peState }) => ({
    filter: getFilter(peState)
  }),
  (dispatch, { peId }) => ({
    onFilterChange(filter) {
      dispatch(changeFilter(peId, filter));
    }
  })
)(SelectorFilter);

export const PluginSelector = connect(
  (state, { peState }) => ({
    elements: getShowing(peState).map(
      eid => getElementById(peState, eid)
    ),
    selected: getSelected(peState)
  }),
  (dispatch, { peId }) => ({
    changeSelectedUp() {
      dispatch(changeSelectedUp(peId));
    },
    changeSelectedDown() {
      dispatch(changeSelectedDown(peId));
    }
  })
)(Selector);

export const PluginSelectorSelected = connect(
  (state, { peState }) => ({
    selectedElement: getSelectedElement(peState)
  })
)(SelectorSelected);