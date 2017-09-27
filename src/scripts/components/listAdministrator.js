// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

type ListType = {
  onLoad: Function,
  elements: Array<any>,
  loading: boolean,
  onSelect: Function,
  selectedElementId: number,
  onRemove: Function,
  className: string,
  emptyText: string,
  elementExtraProps: Object,
  ElementComponent: ComponentType<any>,
  LoadingComponent: ComponentType<any>,
  EmptyComponent: ComponentType<any>,
  WrapperComponent: ComponentType<any>
};

export class List extends Component<ListType> {
  componentWillMount() {
    const { onLoad } = this.props;
    if(typeof onLoad !== 'undefined') {
      onLoad();
    }
  }

  render() {
    const {
      elements = [],
      loading = false, // TODO
      onSelect = _ => _,
      selectedElementId,
      onRemove,
      className = '',
      emptyText = '',
      elementExtraProps = {},
      ElementComponent,
      LoadingComponent,
      EmptyComponent = ({ children }) => <div className="list--empty">{ children }</div>,
      WrapperComponent = ({ children }) => <div className="list-elements">{ children }</div>
    } = this.props;

    const listMapping = (element) =>
      <ElementComponent
        key={ element.id }
        eId={ element.id }
        selected={ selectedElementId === element.id }
        { ...element }
        { ...elementExtraProps }
        onSelect={ onSelect }
        onRemove={ onRemove }
      />;

    return (
      <div className={ `list__creator ${className}`}>
        {
          (elements.length > 0) ?
            <WrapperComponent className="list__elements">
              {
                elements.map(listMapping)
              }
            </WrapperComponent>:
            !loading ?
              <EmptyComponent>{ emptyText }</EmptyComponent>:
              <LoadingComponent />
        }
      </div>
    );
  }
}
