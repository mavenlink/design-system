import React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Input from '../src/components/input';
import styles from './input.css';

const stories = storiesOf('Input', module);

stories.addDecorator(checkA11y);
stories.addDecorator(withKnobs);

stories.add('Default', () => (
  <div>
    <label className={styles.label} htmlFor="greeting">Greeting</label>
    <Input id="greeting" placeholder={text('placeholder', 'hello world')} />
  </div>
));
