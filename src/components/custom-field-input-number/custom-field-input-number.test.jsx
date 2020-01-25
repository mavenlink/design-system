import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputNumber from './custom-field-input-number.jsx';

describe('CustomFieldInputNumber', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <CustomFieldInputNumber />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('prop-forward API', () => {
    it('renders all forwarded props except event handlers', () => {
      const tree = renderer.create((
        <CustomFieldInputNumber
          className={'test-class-name'}
          disabled={false}
          helpText={'test-help-text'}
          id={'test-id'}
          name={'test-name'}
          placeholder={'test-placeholder'}
          required={true}
          value={'42'}
        />
      )).toJSON();
      const stringTree = JSON.stringify(tree);

      expect(tree.props.className).toContain('test-class-name');
      expect(tree.props.className).not.toContain('disabled');

      expect(stringTree).toContain('test-help-text');
      expect(stringTree).toContain('test-id');
      expect(stringTree).toContain('test-name');
      expect(stringTree).toContain('test-placeholder');
      expect(stringTree).toContain('Required');
      expect(stringTree).toContain('42');
    });
  });

  describe('number validation', () => {
    it('is valid on a postive integer', () => {
      render(<CustomFieldInputNumber value="1" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('is valid on zero', () => {
      render(<CustomFieldInputNumber value="0" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('is valid on a negative integer', () => {
      render(<CustomFieldInputNumber value="-1" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('is valid on a decimal integer', () => {
      render(<CustomFieldInputNumber value="1.00" />);
      expect(screen.getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    xit('is invalid on a decimal number', () => {
      // This might be a React bug.
      // If you type "1.01" then it is invalid.
      // If you set it via `value` then it is valid (until you type).
      // Reproduce this on a codepen and make an issue in React.
      render(<CustomFieldInputNumber value="1.01" />);
      expect(screen.getByTestId('custom-field-input')).toHaveClass('error');
    });

    it('is invalid on a string of characters', () => {
      render(<CustomFieldInputNumber value="not-a-number" />);
      expect(screen.getByTestId('custom-field-input')).toHaveClass('error');
    });
  });
});
