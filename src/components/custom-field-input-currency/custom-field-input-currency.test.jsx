import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
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
    const { getByLabelText } = renderComponent({ currencyCode: 'IQD', value: 10111 });

    // NOTE: This space is character code 160, non-breaking space. It did break my brain though
    expect(getByLabelText('currency')).toHaveValue('IQD 10.111');
    fireEvent.focus(getByLabelText('currency'));
    expect(getByLabelText('currency')).toHaveValue(10.111);
  });

  describe('prop-forward API', () => {
    it('forwards all props accepted by CustomFieldInputText on Object keys', () => {
      const excludedNumberProps = ['inputRef', 'max', 'min', 'onKeyUp', 'onKeyDown', 'step', 'onBlur', 'onFocus',
        'type', 'readOnly', 'icon', 'onChange', 'onClick', 'ariaProps', 'dataAttributes'];
      const currencyProps = Object.keys(CustomFieldInputCurrency.propTypes);
      const inputTextProps = Object.keys(CustomFieldInputText.propTypes).filter(p => !excludedNumberProps.includes(p));

      inputTextProps.forEach((key) => {
        expect(currencyProps).toContain(key);
      });
    });

    it('presents contextual error state', () => {
      const helpText = 'What do you want from us monster!?';
      renderComponent({ value: 350, helpText, error: true });

      expect(screen.getByLabelText('currency')).toBeInvalid();
      expect(screen.getByText(helpText)).toBeInTheDocument();
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

  describe('disabled API', () => {
    it('respects the disabled prop', () => {
      const { getByLabelText } = renderComponent({ disabled: true });
      expect(getByLabelText('currency')).toBeDisabled();
    });

    it('does not enter edit mode on focus', () => {
      const { getByLabelText } = renderComponent({ disabled: true });
      fireEvent.focus(getByLabelText('currency'));
      expect(getByLabelText('currency')).toHaveAttribute('type', 'text');
    });

    it('respects the enabled prop', () => {
      const { getByLabelText } = renderComponent({ disabled: false });
      expect(getByLabelText('currency')).not.toBeDisabled();
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      const { getByLabelText } = renderComponent({ readOnly: true });
      expect(getByLabelText('currency')).toHaveAttribute('readOnly', '');
    });

    it('does not enter edit mode on focus', () => {
      const { getByLabelText } = renderComponent({ readOnly: true });
      fireEvent.focus(getByLabelText('currency'));
      expect(getByLabelText('currency')).toHaveAttribute('type', 'text');
    });

    it('is false by default', () => {
      const { getByLabelText } = renderComponent();
      expect(getByLabelText('currency')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('input validation', () => {
    it('does not trigger error state for valid value', () => {
      renderComponent();

      fireEvent.focus(screen.getByLabelText('currency'));
      fireEvent.change(screen.getByLabelText('currency'), { target: { value: 1234 } });
      fireEvent.blur(screen.getByLabelText('currency'));

      expect(screen.getByLabelText('currency')).toBeValid();
      expect(screen.getByLabelText('currency')).toHaveValue('$1,234.00');
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
