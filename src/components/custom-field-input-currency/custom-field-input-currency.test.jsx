import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputCurrency from './custom-field-input-currency.jsx';

describe('CustomFieldInputCurrency', () => {
  const renderComponent = (props = {}) => render(<CustomFieldInputCurrency id="currency" label="currency" {...props} />);

  it('has defaults', () => {
    const tree = renderer.create((
      <CustomFieldInputCurrency id="foo" label="cash money" />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts a currency code', () => {
    const { getByLabelText } = renderComponent({ value: 5000, currencyCode: 'XAF' });
    expect(getByLabelText('currency').value).toMatch(/FCFA/);
  });

  it('sets the correct step according to the provided currency code', () => {
    const { getByLabelText } = renderComponent({ currencyCode: 'IQD', value: 10.111 });

    // NOTE: This space is character code 160, non-breaking space. It did break my brain though
    expect(getByLabelText('currency')).toHaveValue('IQD 10.111');
    fireEvent.focus(getByLabelText('currency'));
    expect(getByLabelText('currency')).toHaveValue(10.111);
  });

  describe('prop-forward API', () => {
    it('forwards all props accepted by CustomFieldInputText on Object keys', () => {
      const excludedNumberProps = ['inputRef', 'max', 'min', 'onKeyUp', 'onKeyDown', 'step', 'onBlur', 'onFocus',
        'type', 'readOnly', 'icon', 'onChange', 'inputClassName'];
      const currencyProps = Object.keys(CustomFieldInputCurrency.propTypes);
      const inputTextProps = Object.keys(CustomFieldInputText.propTypes).filter(p => !excludedNumberProps.includes(p));

      inputTextProps.forEach((key) => {
        expect(currencyProps).toContain(key);
      });
    });

    it('respects the disabled prop', () => {
      const { getByLabelText } = renderComponent({ disabled: true });
      expect(getByLabelText('currency')).toBeDisabled();
    });

    it('respects the enabled prop', () => {
      const { getByLabelText } = renderComponent({ disabled: false });
      expect(getByLabelText('currency')).not.toBeDisabled();
    });

    it('presents contextual error state', () => {
      const helpText = 'What do you want from us monster!?';
      const { getByTestId } = renderComponent({ value: 3.50, helpText, error: true });
      const presentedHelpText = () => getByTestId('custom-field-input').querySelector('.help').innerHTML;

      expect(getByTestId('custom-field-input')).toHaveClass('error');
      expect(presentedHelpText()).toContain(helpText);
    });

    it('renders all forwarded props except event handlers', () => {
      const tree = renderer.create((
        <CustomFieldInputCurrency
          className="test"
          disabled={false}
          id="cFa-id"
          label="cFa-label"
          name="cFa-name"
          placeholder="cFa-placeholder"
          required={true}
          value={10}
        />
      )).toJSON();
      const stringTree = JSON.stringify(tree);

      expect(tree.props.className).toContain('test');
      expect(tree.props.className).not.toContain('disabled');

      expect(stringTree).toContain('cFa-label');
      expect(stringTree).toContain('cFa-id');
      expect(stringTree).toContain('cFa-name');
      expect(stringTree).toContain('cFa-placeholder');
      expect(stringTree).toContain('Required');
      expect(stringTree).toContain('10');
    });
  });

  describe('inputClassName API', () => {
    it('prioritizes inputClassName prop', () => {
      const { getByLabelText } = renderComponent({ inputClassName: 'prioritize-me' });
      expect(getByLabelText('currency')).toHaveClass('prioritize-me');
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      const { getByLabelText } = renderComponent({ readOnly: true });
      expect(getByLabelText('currency')).toHaveAttribute('readOnly', '');
    });

    it('is false by default', () => {
      const { getByLabelText } = renderComponent();
      expect(getByLabelText('currency')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('input validation', () => {
    it('does not trigger error state for valid value', () => {
      const { getByTestId, getByLabelText } = renderComponent();

      fireEvent.focus(getByLabelText('currency'));
      fireEvent.change(getByLabelText('currency'), { target: { value: 1234 } });
      fireEvent.blur(getByLabelText('currency'));

      expect(getByTestId('custom-field-input')).not.toHaveClass('error');
      expect(getByLabelText('currency')).toHaveValue('$1,234.00');
    });

    it('does not switch to view mode when its value is numerically invalid', () => {
      const { getByLabelText } = renderComponent();

      fireEvent.focus(getByLabelText('currency'));
      fireEvent.change(getByLabelText('currency'), { target: { value: 12.111111 } });
      fireEvent.blur(getByLabelText('currency'));

      expect(getByLabelText('currency')).toHaveAttribute('type', 'number');
      expect(getByLabelText('currency')).toHaveValue(12.111111);
    });

    xit('does not switch to view mode when its value is numerically invalid', () => {
      // This test does not work because programmatically setting value
      // on a number input does not reflect a user typing.
      // See commit for more details.
      const { getByLabelText } = renderComponent();

      fireEvent.focus(getByLabelText('currency'));
      fireEvent.change(getByLabelText('currency'), { target: { value: '12..' } });
      fireEvent.blur(getByLabelText('currency'));

      expect(getByLabelText('currency')).toHaveAttribute('type', 'number');
      expect(getByLabelText('currency')).toHaveValue('12..');
    });

    it('accepts an undefined value', () => {
      const { getByLabelText } = renderComponent({ value: undefined });
      expect(getByLabelText('currency')).toHaveValue('');
    });
  });
});
