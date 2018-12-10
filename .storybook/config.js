import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

addDecorator(withOptions({
  name: 'Mavenlink Design System',
  url: 'https://mavenlink.design',
  addonPanelInRight: true,
}));

configure(() => require('../stories/index.js'), module);
