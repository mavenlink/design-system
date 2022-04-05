import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MoneyInput from './money-input.jsx';

describe('MoneyInput', () => {
  const requiredProps = {
    id: 'currency',
    label: 'currency',
    name: 'some-field-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<MoneyInput {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  it('has an empty string with no value', () => {
    render(<MoneyInput {...requiredProps} value={null} />);
    expect(screen.getByLabelText('currency')).toHaveTextContent('');
  });

  it('accepts a currency code', () => {
    render(<MoneyInput {...requiredProps} value={5000} currencyCode="XAF" />);
    expect(screen.getByLabelText('currency').value).toMatch(/FCFA/);
  });

  it('sets the correct step according to the provided currency code', () => {
    render(<MoneyInput {...requiredProps} currencyCode="IQD" value={10111} />);

    // NOTE: This space is character code 160, non-breaking space. It did break my brain though
    expect(screen.getByLabelText('currency')).toHaveValue('IQD 10.111');
    userEvent.click(screen.getByLabelText('currency'));
    expect(screen.getByLabelText('currency')).toHaveValue(10.111);
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', () => {
      const ref = createRef();
      render(<MoneyInput {...requiredProps} ref={ref} />);
      userEvent.click(screen.getByLabelText('currency'));
      expect(ref.current.dirty).toEqual(false);
      userEvent.type(screen.getByLabelText('currency'), '12');
      expect(ref.current.dirty).toEqual(true);
    });
  });

  describe('name ref API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<MoneyInput {...requiredProps} name="some-unique-name" ref={ref} />);
      expect(ref.current.name).toEqual('some-unique-name');
    });
  });

  describe('onChange API', () => {
    it('calls the handler', () => {
      const onChangeSpy = jest.fn();
      const { getByLabelText } = render(<MoneyInput {...requiredProps} onChange={onChangeSpy} />);
      userEvent.type(getByLabelText('currency'), '1');
      expect(onChangeSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      render(<MoneyInput {...requiredProps} readOnly={true} />);
      expect(screen.getByLabelText('currency')).toHaveAttribute('readOnly', '');
    });

    it('does not enter edit mode on focus', () => {
      render(<MoneyInput {...requiredProps} readOnly={true} />);
      userEvent.click(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveAttribute('type', 'text');
    });

    it('is false by default', () => {
      render(<MoneyInput {...requiredProps} />);
      expect(screen.getByLabelText('currency')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('input validation', () => {
    it('does not trigger error state for valid value', () => {
      render(<MoneyInput {...requiredProps} />);

      userEvent.click(screen.getByLabelText('currency'));
      userEvent.type(screen.getByLabelText('currency'), '1234');
      userEvent.tab();

      expect(screen.getByLabelText('currency')).toBeValid();
      expect(screen.getByLabelText('currency')).toHaveValue('$1,234.00');
    });

    it('does not switch to view mode when its value is numerically invalid', () => {
      render(<MoneyInput {...requiredProps} />);

      userEvent.click(screen.getByLabelText('currency'));
      userEvent.type(screen.getByLabelText('currency'), '12.111111');
      expect(screen.getByLabelText('currency')).toHaveAttribute('type', 'number');

      userEvent.tab();
      expect(screen.getByLabelText('currency')).toHaveValue(12.111111);
    });

    it('accepts an undefined value', () => {
      render(<MoneyInput {...requiredProps} value={undefined} />);
      expect(screen.getByLabelText('currency')).toHaveValue('');
    });
  });

  describe('displayed value', () => {
    it('does not try to parse an empty input to float', () => {
      render(<MoneyInput {...requiredProps} />);

      userEvent.click(screen.getByLabelText('currency'));
      userEvent.click(document.body);
      userEvent.click(screen.getByLabelText('currency'));

      expect(screen.getByLabelText('currency')).toHaveValue(null);
    });
  });

  describe('value API', () => {
    it('can be undefined', () => {
      render(<MoneyInput {...requiredProps} />);
      expect(screen.getByLabelText('currency')).toHaveValue('');
      userEvent.click(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveValue(null);
    });

    it('can be 0', () => {
      render(<MoneyInput {...requiredProps} value={0} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$0.00');
      userEvent.click(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveValue(0);
    });

    it('can be a positive integer', () => {
      render(<MoneyInput {...requiredProps} value={1} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$0.01');
      userEvent.click(screen.getByLabelText('currency'));
      expect(screen.getByLabelText('currency')).toHaveValue(0.01);
    });

    it('can be updated', () => {
      const { rerender } = render(<MoneyInput {...requiredProps} value={0} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$0.00');
      rerender(<MoneyInput {...requiredProps} value={100} />);
      expect(screen.getByLabelText('currency')).toHaveValue('$1.00');
    });
  });

  describe('value ref API', () => {
    it('can get a positive value', () => {
      const ref = createRef(null);
      render(<MoneyInput {...requiredProps} id="test-input" label="Test label" ref={ref} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), '12.34');
      expect(ref.current.value).toStrictEqual(1234);
      userEvent.tab();
      expect(ref.current.value).toStrictEqual(1234);
    });

    it('can get a negative value', () => {
      const ref = createRef(null);
      render(<MoneyInput {...requiredProps} id="test-input" label="Test label" ref={ref} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), '-12.34');
      expect(ref.current.value).toStrictEqual(-1234);
      userEvent.tab();
      expect(ref.current.value).toStrictEqual(-1234);
    });

    it('can be undefined', () => {
      const ref = createRef(null);
      render(<MoneyInput {...requiredProps} id="test-input" label="Test label" ref={ref} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), '');

      expect(ref.current.value).toBeUndefined();
      userEvent.tab();
      expect(ref.current.value).toBeUndefined();
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<MoneyInput {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription('');
    });
  });

  describe('validationMessage API', () => {
    it('shows the message', () => {
      render(<MoneyInput {...requiredProps} validationMessage={'What do you want from us monster!?'} />);
      expect(screen.getByLabelText('currency')).toBeInvalid();
      expect(screen.getByLabelText('currency')).toHaveAccessibleDescription('What do you want from us monster!?');
    });

    it('clears the message on blur', () => {
      render(<MoneyInput {...requiredProps} />);
      expect(screen.getByLabelText('currency')).toBeValid();
      userEvent.type(screen.getByLabelText('currency'), '1.111');
      userEvent.click(document.body);
      expect(screen.getByLabelText('currency')).toBeInvalid();
      expect(screen.getByLabelText('currency')).toHaveAccessibleDescription('Constraints not satisfied');
      userEvent.type(screen.getByLabelText('currency'), '{backspace}');
      userEvent.click(document.body);
      expect(screen.getByLabelText('currency')).toBeValid();
      expect(screen.queryByText('Constraints not satisfied')).not.toBeInTheDocument();
    });
  });
});
