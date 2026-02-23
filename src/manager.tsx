import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { Tool } from './components/Tool';
import { ADDON_ID, TOOL_ID } from './constants';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the theme switcher tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Carbon Theme',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <Tool />,
  });
});
