// @flow
import React from 'react';

import { LimitedView } from './viewTypes';

type Props = {};

class ForbiddenView extends React.Component<Props> {
  render() {
    return (
      <LimitedView className="forbidden-view" limit="large">
        <h1>Forbidden</h1>
      </LimitedView>
    );
  }
}

export default ForbiddenView;
