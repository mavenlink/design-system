import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Input from './input';

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Input id="greeting" placeholder={text('placeholder', 'hello world')} />
  ));
