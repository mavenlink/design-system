import React, { createRef } from 'react';
import { render as _render } from '@testing-library/react';
import Choice from './choice.jsx';
import jestServer from '../../mocks/jest-server.js';
import mockHandlers from '../custom-field-input-single-choice/mock-handlers.js';

const render = (ui, options = { labelledBy: 'labelled-by' }) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <table>
        <thead>
          <tr>
            <th id={options.labelledBy}>Column Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.children}
          </tr>
        </tbody>
      </table>
    ),
  })
);

describe('Choice cell control', () => {
  beforeEach(() => {
    jestServer.use(...mockHandlers());
  });

  const requiredProps = {
    customFieldID: '0',
    id: 'test-id',
    labelledBy: 'labelled-by',
    name: 'test-name',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Choice {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toBe(document.activeElement);
    expect(ref.current).toMatchSnapshot();
  });
});
