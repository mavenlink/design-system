import React, { createRef } from 'react';
import {
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import Number from './number.jsx';

describe('Number', () => {
  const requiredProps = {
    id: 'test-component',
    label: 'Test Component',
  };

  afterEach(cleanup);

  it('has defaults', () => {
    const ref = createRef();
    render(<Number {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('label', () => {
    it('presents a label', () => {
      render(<Number {...requiredProps} />);
      expect(screen.getByLabelText('Test Component')).toBeInTheDocument();
    });
  });
});
