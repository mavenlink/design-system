import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import FormControl from './form-control.jsx';

describe('<FormControl>', () => {
  const requiredProps = {
    children: <input aria-describedby="test-idHint" id="test-id" />,
    id: 'test-id',
    label: 'Test label',
    validationMessageId: 'test-validation-id',
  };

  it('has defaults', () => {
    render(<FormControl {...requiredProps}>{requiredProps.children}</FormControl>);
    expect(document.body).toMatchSnapshot();
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} className="unique-class">{requiredProps.children}</FormControl>);
      expect(screen.getByLabelText('Test label').parentElement.parentElement).toHaveAttribute('class', 'unique-class');
    });
  });

  describe('children API', () => {
    it('can be set', () => {
      const inputRef = createRef();
      render((
        <FormControl {...requiredProps}>
          <input aria-describedby="test-idHint" id="test-id" ref={inputRef} />
        </FormControl>
      ));
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
    });
  });

  describe('validationMessage API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} validationMessage="I am an error message">{requiredProps.children}</FormControl>);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('id API', () => {
    it('can be set without a labelId', () => {
      render((
        <FormControl {...requiredProps} id="unique-id">
          <input aria-describedby="unique-idHint" id="unique-id" />
        </FormControl>
      ));
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} label="Unique label">{requiredProps.children}</FormControl>);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('labelId API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} labelId="unique-label-id">{requiredProps.children}</FormControl>);
      expect(screen.getByText('Test label')).toHaveAttribute('id', 'unique-label-id');
    });
  });

  describe('onKeyDown API', () => {
    it('can be set', () => {
      const onKeyDownSpy = jest.fn();
      render(<FormControl {...requiredProps} onKeyDown={onKeyDownSpy}>{requiredProps.children}</FormControl>);
      user.click(screen.getByText('Test label'));
      user.keyboard('a');
      expect(onKeyDownSpy).toHaveBeenCalled();
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} required={true}>{requiredProps.children}</FormControl>);
      expect(screen.getByText('(Required)')).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<FormControl {...requiredProps} required={false}>{requiredProps.children}</FormControl>);
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('displays the tooltip text when the help icon is hovered over', () => {
      render(
        <FormControl {...requiredProps} tooltip={tooltip}>
          <input id="test-id" aria-describedby="test-id-tooltip" />
        </FormControl>,
      );
      user.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByText(tooltip)).toBeInTheDocument();
    });

    it('removes the tooltip when the help icon is unhovered', () => {
      render(
        <FormControl {...requiredProps} tooltip={tooltip}>
          <input id="test-id" aria-describedby="test-id-tooltip" />
        </FormControl>,
      );
      user.hover(screen.getByRole('img', { name: 'More information' }));
      user.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.queryByText(tooltip)).not.toBeInTheDocument();
    });
  });
});
