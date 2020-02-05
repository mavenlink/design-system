import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomFieldInputNumber from './custom-field-input-number.jsx';

describe('CustomFieldInputNumber', () => {
  function TestComponent(props = {}) {
    return <CustomFieldInputNumber id="test-input" label="Test label" {...props} />;
  }

  it('has defaults', () => {
    const tree = renderer.create(<TestComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('prop-forward API', () => {
    it('renders all forwarded props except event handlers', () => {
      const tree = renderer.create((
        <TestComponent
          className={'test-class-name'}
          disabled={false}
          id={'test-id'}
          name={'test-name'}
          placeholder={'test-placeholder'}
          value={42}
        />
      )).toJSON();
      const stringTree = JSON.stringify(tree);

      expect(tree.props.className).toContain('test-class-name');
      expect(tree.props.className).not.toContain('disabled');

      expect(stringTree).toContain('test-id');
      expect(stringTree).toContain('test-name');
      expect(stringTree).toContain('test-placeholder');
      expect(stringTree).toContain('42');
    });
  });

  describe('number validation', () => {
    it('is valid on a postive integer', () => {
      render(<TestComponent value="1" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('is valid on zero', () => {
      render(<TestComponent value="0" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('is valid on a negative integer', () => {
      render(<TestComponent value="-1" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('is valid on a decimal integer', () => {
      render(<TestComponent value="1.00" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('is invalid on a decimal number', () => {
      render(<TestComponent value="1.01" />);
      expect(screen.getByTestId('custom-field-input')).toHaveClass('error');
    });

    it('is invalid on a string of characters', () => {
      render(<TestComponent value="not-a-number" />);
      expect(screen.getByTestId('custom-field-input')).toHaveClass('error');
    });
  });
});
