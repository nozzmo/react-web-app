import React from 'react';

import { hoTransform } from '../utils';
import { tvd, thd } from './popover';

const TIP_DIRECTIONS = [
  'up',
  'right',
  'down',
  'left'
];

// Transform tip direction
const ttd = hoTransform({
  array: TIP_DIRECTIONS,
  defaultElement: 'down'
});

const Tip = ({ direction }) => (
  <div className={ 'tip ' + ttd(direction) }></div>
);

export default Tip;

export const TipRail = ({
  isHorizontal = true,
  vertical,
  horizontal
}) => {
  const tver = tvd(vertical);
  const thor = thd(horizontal);

  return (
    <div className={ `tip-rail ${ isHorizontal ? 'horizontal': 'vertical' } ${ tver } ${ thor }` }>
      { tver === 'above' && <Tip direction='down' /> }
      { tver === 'below' && <Tip direction='up' /> }
      { thor === 'before' && <Tip direction='right' /> }
      { thor === 'after' && <Tip direction='left' /> }
    </div>
  );
};
