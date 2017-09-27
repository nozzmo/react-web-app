// @flow
import React from 'react';

const Loader = ({ naked = false }: { naked: boolean }) => naked ? (
  <span className="loader">
    <span className="o"></span>
  </span>
): (
  <div className="center-text">
    <span className="loader">
      <span className="o"></span>
    </span>
  </div>
);

export default Loader;
