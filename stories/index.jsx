import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../lib/input';

storiesOf('Input', module)
  .add('Normal', () => <Input id="hello" />);
