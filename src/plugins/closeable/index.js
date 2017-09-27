import { pluginComponent as plugin } from 'redux-plugin';
import { register } from './actions';
import Popover, { ClickPopover } from './components/popover';

import { PLUGIN_NAME } from './configuration';


export const ReduxPopover = plugin({
  defaultStateKey: PLUGIN_NAME,
  registerPluginElement: register
})(Popover);

export const ReduxClickPopover = plugin({
  defaultStateKey: PLUGIN_NAME,
  registerPluginElement: register
})(ClickPopover);
