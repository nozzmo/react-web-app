import { pluginComponent as plugin } from 'redux-plugin';

import { register } from './actions';
import {
  PluginSelector,
  PluginSelectorFilter,
  PluginSelectorSelected } from './components';
import { PLUGIN_NAME } from './configuration';

export const ReduxSelector = plugin({
  defaultStateKey: PLUGIN_NAME,
  registerPluginElement: register
})(PluginSelector);

export const ReduxSelectorFilter = plugin({
  defaultStateKey: PLUGIN_NAME,
  registerPluginElement: register
})(PluginSelectorFilter);

export const ReduxSelectorSelected = plugin({
  defaultStateKey: PLUGIN_NAME,
  registerPluginElement: register
})(PluginSelectorSelected);