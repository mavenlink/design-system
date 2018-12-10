import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js');
}

addDecorator(withOptions({
  name: 'Mavenlink Design System',
  url: 'https://mavenlink.design',
  addonPanelInRight: true,
}));

configure(loadStories, module);
