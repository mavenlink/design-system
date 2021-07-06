import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CellControl from './cell-control.jsx';

describe('<CellControl>', () => {
  const requiredProps = {
    children: <input id="test-id" />,
    id: 'test-id',
    label: 'Test label',
  };

  it('has defaults', () => {
    render(<CellControl {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('requires either an id or a labelId', () => {
    /* eslint-disable no-console */
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<CellControl {...requiredProps} id={undefined} labelId={undefined} />);
    expect(console.error).toHaveBeenNthCalledWith(1, 'Warning: Failed prop type: Invalid prop `id` supplied to `CellControl`. Either `id` or `labelId` are required.\n    in CellControl');
    expect(console.error).toHaveBeenNthCalledWith(2, 'Warning: Failed prop type: Invalid prop `labelId` supplied to `CellControl`. Either `id` or `labelId` are required.\n    in CellControl');

    console.error = originalConsoleError;
    /* eslint-enable no-console */
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<CellControl {...requiredProps} className="unique-class" />);
      expect(screen.getByLabelText('Test label').parentElement.parentElement).toHaveAttribute('class', 'unique-class');
    });
  });

  describe('children API', () => {
    it('can be set', () => {
      const inputRef = createRef();
      render((
        <CellControl {...requiredProps}>
          <input id="test-id" ref={inputRef} />
        </CellControl>
      ));
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
    });
  });

  describe('error API', () => {
    it('can be set', () => {
      render(<CellControl {...requiredProps} error="I am an error message" />);
      expect(screen.getByText('I am an error message')).toBeInTheDocument();
    });

    it('uses aria-live polite to alert users of an error', () => {
      render(<CellControl {...requiredProps} error="I am an error message" />);
      expect(screen.getByText('I am an error message')).toHaveAttribute('aria-live', 'polite');
    });

    it('uses a hint to alert users of the error message', () => {
      render(<CellControl {...requiredProps} error="I am an error message" />);
      expect(screen.getByText('I am an error message')).toHaveAttribute('id', 'test-idHint');
    });
  });

  describe('id API', () => {
    it('can be set without a labelId', () => {
      render((
        <CellControl {...requiredProps} id="unique-id">
          <input id="unique-id" />
        </CellControl>
      ));
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<CellControl {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('labelId API', () => {
    it('can be set without an id', () => {
      render(<CellControl {...requiredProps} id={undefined} labelId="unique-label-id" />);
      expect(screen.getByText('Test label')).toHaveAttribute('id', 'unique-label-id');
    });
  });

  describe('onKeyDown API', () => {
    it('can be set', () => {
      const onKeyDownSpy = jest.fn();
      render(<CellControl {...requiredProps} onKeyDown={onKeyDownSpy} />);
      user.click(screen.getByText('Test label'));
      user.keyboard('a');
      expect(onKeyDownSpy).toHaveBeenCalled();
    });
  });

  describe('readOnly API', () => {
    it('can be set and hides the error state', () => {
      render(<CellControl {...requiredProps} readOnly={true} error="I am invalid" />);
      expect(screen.queryByText('I am invalid')).not.toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<CellControl {...requiredProps} readOnly={false} error="I am invalid" />);
      expect(screen.getByText('I am invalid')).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<CellControl {...requiredProps} required={true} />);
      expect(screen.getByText('(Required)')).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<CellControl {...requiredProps} required={false} />);
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('displays the tooltip text when the help icon is hovered over', () => {
      render(<CellControl {...requiredProps} tooltip={tooltip} />);
      user.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByText(tooltip)).toBeInTheDocument();
    });

    it('removes the tooltip when the help icon is unhovered', () => {
      render(<CellControl {...requiredProps} tooltip={tooltip} />);
      user.hover(screen.getByRole('img', { name: 'More information' }));
      user.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.queryByText(tooltip)).not.toBeInTheDocument();
    });
  });
});
