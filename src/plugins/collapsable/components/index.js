import React from 'react';


const Collapsable = ({ height, className, children }) => (
  <div
    className={ "collapsable grid " + (className || '')}>
    <div
      className="row middle-xs"
      style={{
        minHeight: `${ height }`
      }}>
      <div className="col">
        { children }
      </div>
    </div>
  </div>
);

export default Collapsable;
