export const POPOVER_DIRECTIONS = {
  horizontal: ['before', 'after', 'left', 'center', 'right'],
  vertical: ['above', 'below', 'top', 'middle', 'bottom']
};

export const MOUSE_WHEEL_EVENT = (
    /Firefox/i.test(navigator.userAgent)) ?
        'DOMMouseScroll' : 'mousewheel';