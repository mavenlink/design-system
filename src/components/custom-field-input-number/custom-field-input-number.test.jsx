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
          className={'test'}
          disabled={false}
          error={true}
          helpText={'help'}
          id={'id'}
          name={'name'}
          placeholder={'placeholder'}
          required={true}
          type={'text'}
          value={'value'}
        />
      )).toJSON();
      const stringTree = JSON.stringify(tree);

      expect(tree.props.className).toContain('test error');
      expect(tree.props.className).not.toContain('disabled');

      expect(stringTree).toContain('help');
      expect(stringTree).toContain('id');
      expect(stringTree).toContain('name');
      expect(stringTree).toContain('placeholder');
      expect(stringTree).toContain('Required');
      expect(stringTree).toContain('type');
      expect(stringTree).toContain('value');
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
