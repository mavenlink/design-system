import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';
import Input from '../src/components/input';
import styles from './input.css';

const stories = storiesOf('Input', module);

stories.addDecorator(checkA11y);
stories.add('Normal', () => (
  <div>
    <label className={styles.label} htmlFor="greeting">Greeting</label>
    <Input id="greeting" placeholder="hello world" />
  </div>
));
