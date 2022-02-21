import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputCurrency from './custom-field-input-currency.jsx';

describe('CustomFieldInputCurrency', () => {
  const requiredProps = {
    id: 'currency',
    label: 'currency',
    name: 'some-field-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputCurrency {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  it('accepts a currency code', () => {
    render(<CustomFieldInputCurrency {...requiredProps} value={5000} currencyCode="XAF" />);
    expect(screen.getByLabelText('currency').value).toMatch(/FCFA/);
  });

  it('sets the correct step according to the provided currency code', () => {
    render(<CustomFieldInputCurrency {...requiredProps} currencyCode="IQD" value={10111} />);

    // NOTE: This space is character code 160, non-breaking space. It did break my brain though
    expect(screen.getByLabelText('currency')).toHaveValue('IQD 10.111');
    fireEvent.focus(screen.getByLabelText('currency'));
    expect(screen.getByLabelText('currency')).toHaveValue(10.111);
  });

  describe('prop-forward API', () => {
    it('forwards all props accepted by CustomFieldInputText on Object keys', () => {
      const excludedNumberProps = ['inputRef', 'max', 'min', 'onKeyUp', 'onKeyDown', 'step', 'onBlur', 'onFocus', 'type',
        'readOnly', 'icon', 'onChange', 'onClick', 'ariaProps', 'defaultValue', 'errorText', 'maxLength'];
      const currencyProps = Object.keys(CustomFieldInputCurrency.propTypes);
      const inputTextProps = Object.keys(CustomFieldInputText.propTypes).filter(p => !excludedNumberProps.includes(p));

      inputTextProps.forEach((key) => {
        expect(currencyProps).toContain(key);
      });
    });

    it('presents contextual error state', () => {
      const errorText = 'What do you want from us monster!?';
      render(<CustomFieldInputCurrency {...requiredProps} value={350} errorText={errorText} />);

      expect(screen.getByLabelText('currency')).toBeInvalid();
      expect(screen.getByLabelText('currency')).toHaveAccessibleDescription(errorText);
    });
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', () => {
      const ref = createRef();
      render(<CustomFieldInputCurrency {...requiredProps} ref={ref} />);
      userEvent.click(screen.getByLabelText('currency'));
      expect(ref.current.dirty).toEqual(false);
      userEvent.type(screen.getByLabelText('currency'), '12');
      expect(ref.current.dirty).toEqual(true);
      userEvent.type(screen.getByLabelText('currency'), '{backspace}');
      expect(ref.current.dirty).toEqual(true);
      userEvent.type(screen.getByLabelText('currency'), '{backspace}');
      expect(ref.current.dirty).toEqual(false);
    });
  });

  describe('name ref API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<CustomFieldInputCurrency {...requiredProps} name="some-unique-name" ref={ref} />);
      expect(ref.current.name).toEqual('some-unique-name');
    });
  });

  describe('onChange API', () => {
    it('calls the handler', () => {
      const onChangeSpy = jest.fn();
      const { getByLabelText } = render(<CustomFieldInputCurrency {...requiredProps} onChange={onChangeSpy} />);
      userEvent.type(getByLabelText('currency'), '1234');
      expect(onChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({
          value: [123400, 'USD'],
        }),
      }));
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      render(<CustomFieldInputCurrency {...requiredProps} readOnly={true} />);
      expect(screen.getByLabelText('currency')).toHaveAttribute('readOnly', '');
    });

    it('does not enter edit mode on focus', () => {
      render(<CustomFieldInputCurrency {...requiredProps} readOnly={true} />);
      fireEvent.focus(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveAttribute('type', 'text');
    });

    it('is false by default', () => {
      render(<CustomFieldInputCurrency {...requiredProps} />);
      expect(screen.getByLabelText('currency')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('input validation', () => {
    it('does not trigger error state for valid value', () => {
      render(<CustomFieldInputCurrency {...requiredProps} />);

      fireEvent.focus(screen.getByLabelText('currency'));
      fireEvent.change(screen.getByLabelText('currency'), { target: { value: 1234 } });
      fireEvent.blur(screen.getByLabelText('currency'));

      expect(screen.getByLabelText('currency')).toBeValid();
      expect(screen.getByLabelText('currency')).toHaveValue('$1,234.00');
    });

    it('does not switch to view mode when its value is numerically invalid', () => {
      render(<CustomFieldInputCurrency {...requiredProps} />);

      fireEvent.focus(screen.getByLabelText('currency'));
      fireEvent.change(screen.getByLabelText('currency'), { target: { value: 12.111111 } });
      fireEvent.blur(screen.getByLabelText('currency'));

      expect(screen.getByLabelText('currency')).toHaveAttribute('type', 'number');
      expect(screen.getByLabelText('currency')).toHaveValue(12.111111);
    });

    xit('does not switch to view mode when its value is numerically invalid', () => {
      // This test does not work because programmatically setting value
      // on a number input does not reflect a user typing.
      // See commit for more details.
      render(<CustomFieldInputCurrency {...requiredProps} />);

      fireEvent.focus(screen.getByLabelText('currency'));
      fireEvent.change(screen.getByLabelText('currency'), { target: { value: '12..' } });
      fireEvent.blur(screen.getByLabelText('currency'));

      expect(screen.getByLabelText('currency')).toHaveAttribute('type', 'number');
      expect(screen.getByLabelText('currency')).toHaveValue('12..');
    });

    it('accepts an undefined value', () => {
      render(<CustomFieldInputCurrency {...requiredProps} value={undefined} />);
      expect(screen.getByLabelText('currency')).toHaveValue('');
    });
  });

  describe('displayed value', () => {
    it('does not try to parse an empty input to float', () => {
      render(<CustomFieldInputCurrency {...requiredProps} />);

      userEvent.click(screen.getByLabelText('currency'));
      userEvent.click(document.body);
      userEvent.click(screen.getByLabelText('currency'));

      expect(screen.getByLabelText('currency')).toHaveValue(null);
    });
  });

  describe('value API', () => {
    it('can be undefined', () => {
      render(<CustomFieldInputCurrency {...requiredProps} />);
      expect(screen.getByLabelText('currency')).toHaveValue('');
      userEvent.click(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveValue(null);
    });

    it('can be 0', () => {
      render(<CustomFieldInputCurrency {...requiredProps} value={0} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$0.00');
      userEvent.click(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveValue(0);
    });

    it('can be a positive integer', () => {
      render(<CustomFieldInputCurrency {...requiredProps} value={1} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$0.01');
      userEvent.click(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveValue(0.01);
    });

    it('can be updated', () => {
      const { rerender } = render(<CustomFieldInputCurrency {...requiredProps} value={0} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$0.00');
      rerender(<CustomFieldInputCurrency {...requiredProps} value={100} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$1.00');
    });
  });

  describe('value ref API', () => {
    it('can get a positive value', () => {
      const ref = createRef(null);
      render(<CustomFieldInputCurrency {...requiredProps} id="test-input" label="Test label" ref={ref} />);

      fireEvent.focus(screen.getByLabelText('Test label'));
      fireEvent.change(screen.getByLabelText('Test label'), { target: { value: 1234 } });
      expect(ref.current.value).toStrictEqual([123400, 'USD']);
      fireEvent.blur(screen.getByLabelText('Test label'));
      expect(ref.current.value).toStrictEqual([123400, 'USD']);
    });

    it('can get a negative value', () => {
      const ref = createRef(null);
      render(<CustomFieldInputCurrency {...requiredProps} id="test-input" label="Test label" ref={ref} />);

      fireEvent.focus(screen.getByLabelText('Test label'));
      fireEvent.change(screen.getByLabelText('Test label'), { target: { value: -1234 } });
      expect(ref.current.value).toStrictEqual([-123400, 'USD']);
      fireEvent.blur(screen.getByLabelText('Test label'));
      expect(ref.current.value).toStrictEqual([-123400, 'USD']);
    });

    it('can be undefined', () => {
      const ref = createRef(null);
      render(<CustomFieldInputCurrency {...requiredProps} id="test-input" label="Test label" ref={ref} />);

      fireEvent.focus(screen.getByLabelText('Test label'));
      fireEvent.change(screen.getByLabelText('Test label'), { target: { value: '' } });

      expect(ref.current.value).toBeUndefined();
      fireEvent.blur(screen.getByLabelText('Test label'));
      expect(ref.current.value).toBeUndefined();
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<CustomFieldInputCurrency {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<CustomFieldInputCurrency {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription('');
    });
  });
});
