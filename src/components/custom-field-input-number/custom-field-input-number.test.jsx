import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    it('forwards all props accepted by CustomFieldInputText on Object keys', () => {
      const numberProps = Object.keys(CustomFieldInputNumber.propTypes);
      Object.keys(CustomFieldInputText.propTypes).forEach((key) => {
        expect(numberProps).toContain(key);
      });
    });

    it('renders all forwarded props except event handlers', () => {
      const tree = renderer.create((
        <CustomFieldInputNumber
          className={'test-class-name'}
          disabled={false}
          error={true}
          helpText={'test-help-text'}
          id={'test-id'}
          name={'test-name'}
          placeholder={'test-placeholder'}
          required={true}
          type={'test-input-type'}
          value={'test-value'}
        />
      )).toJSON();
      const stringTree = JSON.stringify(tree);

      expect(tree.props.className).toContain('test-class-name error');
      expect(tree.props.className).not.toContain('disabled');

      expect(stringTree).toContain('test-help-text');
      expect(stringTree).toContain('test-id');
      expect(stringTree).toContain('test-name');
      expect(stringTree).toContain('test-placeholder');
      expect(stringTree).toContain('Required');
      expect(stringTree).toContain('test-input-type');
      expect(stringTree).toContain('test-value');
    });
  });

  describe('input validation', () => {
    it('does not trigger error state for valid value', () => {
      const { getByRole, getByTestId } = render(
        <CustomFieldInputNumber />,
      );

      fireEvent.change(getByRole('textbox'), { target: { value: '1234' } });

      expect(getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('has error state for invalid value', () => {
      const { getByRole, getByTestId } = render(
        <CustomFieldInputNumber />,
      );

      fireEvent.change(getByRole('textbox'), { target: { value: '--0.1.2' } });

      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });
  });
});
