import { pluginComponent as plugin } from 'redux-plugin';
import { register } from './actions';
import { getCollapsable } from './reducers';
import Collapsable from './components';

import { PLUGIN_NAME } from './configuration';


const ReduxCollapsable = plugin({
  defaultStateKey: PLUGIN_NAME,
  registerPluginElement: register,
  getPluginElementState: getCollapsable
})(Collapsable);

export default ReduxCollapsable;