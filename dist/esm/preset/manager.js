import { addons, types } from '@storybook/addons';
import { ADDON_ID, TOOL_ID } from '../constants';
import { Tool } from '../Tool';

// Register the addon
addons.register(ADDON_ID, function () {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Drupal Theme',
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return !!(viewMode && viewMode.match(/^(story|docs)$/));
    },
    render: Tool
  });
});