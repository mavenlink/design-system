import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputCurrency from './custom-field-input-currency.jsx';

describe('CustomFieldInputCurrency', () => {
  it('has defaults', () => {
    const tree = renderer.create((
      <CustomFieldInputCurrency id="foo" label="cash money" />
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('prop-forward API', () => {
    it('forwards all props accepted by CustomFieldInputText on Object keys', () => {
      const excludedNumberProps = ['inputRef', 'max', 'min', 'onKeyUp', 'onKeyDown', 'step', 'onBlur', 'onFocus'];
      const currencyProps = Object.keys(CustomFieldInputCurrency.propTypes);
      const inputTextProps = Object.keys(CustomFieldInputText.propTypes).filter(p => !excludedNumberProps.includes(p));

      inputTextProps.forEach((key) => {
        expect(currencyProps).toContain(key);
      });
    });

    it('respects the disabled prop', () => {
      const { getByLabelText } = render(<CustomFieldInputCurrency label="foo" id="foo" disabled />);
      expect(getByLabelText('foo')).toBeDisabled();
    });

    it('respects the enabled prop', () => {
      const { getByLabelText } = render(<CustomFieldInputCurrency label="foo" id="foo" disabled={false} />);
      expect(getByLabelText('foo')).not.toBeDisabled();
    });

    it('renders all forwarded props except event handlers', () => {
      const tree = renderer.create((
        <CustomFieldInputCurrency
          className={'test'}
          disabled={false}
          id={'id'}
          label="cFa"
          name={'name'}
          placeholder={'placeholder'}
          required={true}
          type={'text'}
          value={10}
        />
      )).toJSON();
      const stringTree = JSON.stringify(tree);

      // expect(tree.props.className).toContain('test error');
      expect(tree.props.className).not.toContain('disabled');

      expect(stringTree).toContain('id');
      expect(stringTree).toContain('name');
      expect(stringTree).toContain('placeholder');
      expect(stringTree).toContain('Required');
      expect(stringTree).toContain('type');
      expect(stringTree).toContain('10');
    });
  });

  describe('input validation', () => {
    it('does not trigger error state for valid value', () => {
      const { getByRole, getByTestId } = render(
        <CustomFieldInputCurrency id="moolah" label="kaching" />,
      );

      fireEvent.change(getByRole('textbox'), { target: { value: '$1234' } });

      expect(getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    it('correctly uses the currencySymbol attribute', () => {
      const { getByRole, getByTestId } = render(
        <CustomFieldInputCurrency id="moolah" label="kaching" currencySymbol="€" />,
      );

      fireEvent.change(getByRole('textbox'), { target: { value: '€1234' } });

      expect(getByTestId('custom-field-input')).not.toHaveClass('error');
    });

    xit('has error state for invalid value', () => {
      const { getByRole, getByTestId } = render(
        <CustomFieldInputCurrency id="moolah" label="kaching" />,
      );

      fireEvent.change(getByRole('textbox'), { target: { value: '$--0.1.2' } });

      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });

    it('does not switch to view mode when its value is invalid', () => {
      const { getByLabelText } = render(<CustomFieldInputCurrency label="foo" id="foo" />);

      fireEvent.focus(getByLabelText('foo'));
      fireEvent.change(getByLabelText('foo'), { target: { value: 12.111111 } });
      fireEvent.blur(getByLabelText('foo'));

      expect(getByLabelText('foo')).not.toHaveAttribute('type', 'text');
    });
  });

  describe('input', () => {
    it('edits correctly', () => {
      const { getByLabelText } = render(<CustomFieldInputCurrency label="cash money" id="cash-money" value={123} />);
      expect(getByLabelText('cash money')).toHaveValue('$123.00');

      fireEvent.focus(getByLabelText('cash money'));
      fireEvent.change(getByLabelText('cash money'), { target: { value: '456' } });
      fireEvent.blur(getByLabelText('cash money'));

      expect(getByLabelText('cash money')).toHaveValue('$456.00');
    });
  });

  it('sets the correct step according to currency', () => {
    const { getByLabelText } = render(<CustomFieldInputCurrency label="money" id="money" value={10.111} currencyCode="IQD" />);

    // NOTE: This space is character code 160, non-breaking space. It did break my brain though
    expect(getByLabelText('money')).toHaveValue('IQD 10.111');
    fireEvent.focus(getByLabelText('money'));
    expect(getByLabelText('money')).toHaveValue(10.111);
  });
});
