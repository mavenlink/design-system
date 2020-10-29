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

  describe('label API', () => {
    it('presents a label', () => {
      render(<Number {...requiredProps} />);
      expect(screen.getByLabelText('Test Component')).toBeInTheDocument();
    });
  });

  describe('name API', () => {
    it('presents the name on the component', () => {
      render(<Number {...requiredProps} name="foo-bar" />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('name', 'foo-bar');
    });

    it('exposes the name on the ref', () => {
      const ref = createRef();
      render(<Number {...requiredProps} name="foo-bar" ref={ref} />);
      expect(ref.current.name).toEqual('foo-bar');
    });
  });

  describe('placeholder API', () => {
    it('allows setting placeholder text', () => {
      render(<Number {...requiredProps} placeholder="Hello!" />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('placeholder', 'Hello!');
    });
  });
});
