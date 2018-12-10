import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../src/components/input';

const stories = storiesOf('Input', module);

stories.add('Normal', () => <Input id="hello" />);
