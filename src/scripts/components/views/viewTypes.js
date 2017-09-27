// @flow
import React from 'react';
import type { Node } from 'react';

type ViewPropTypes = {
  bodyClass?: string,
  className: string,
  children?: Node,
  limit?: string
}

export class View extends React.Component<ViewPropTypes> {
  componentDidMount() {
    const { bodyClass } = this.props;
    if (bodyClass != null) {
      if(document && document.body) {
        document.body.classList.add(bodyClass);
      }
    }
  }

  componentWillUnmount() {
    const { bodyClass } = this.props;
    if (bodyClass != null) {
      if(document && document.body) {
        document.body.classList.remove(bodyClass);
      }
    }
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={"view " + (className || '') }>
        { children }
      </div>
    );
  }
}

export class CenteredView extends View {
  render() {
    const { children, className } = this.props;
    return (
      <div className={"view padded-x " + className }>
        <div className="grid frame">
          <div className="row middle-xs">
            <div className="col">
               { children }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class LimitedView extends View {
  render() {
    const { children, className, limit = 'large' } = this.props;
    return (
      <div className={`view view--limit-${ limit } ` + className }>
       { children }
      </div>
    );
  }
}
