export const hoTransform = ({ array, defaultElement }) => element =>
  array.includes(element) ?
    element:
    defaultElement;
