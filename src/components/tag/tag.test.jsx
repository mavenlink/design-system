import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tag from './tag.jsx';

describe('Tag', () => {
  const requiredProps = {
    children: 'Test Title',
    id: 'test-id',
  };

  it('renders a tag component', () => {
    const tree = renderer
      .create((
        <Tag {...requiredProps} />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('children API', () => {
    it('can be set', () => {
      render(<Tag {...requiredProps}>Unique children</Tag>);
      expect(screen.getByText('Unique children')).toBeDefined();
    });
  });

  describe('Focus Behavior', () => {
    it('moves focus with arrow key', () => {
      render(<Tag {...requiredProps} />);

      fireEvent.keyDown(screen.getByText('Test Title'), { key: 'ArrowRight' });

      expect(screen.getByText('Test Title')).not.toEqual(document.activeElement);
      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);

      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });

      expect(screen.getByText('Test Title')).not.toEqual(document.activeElement);
      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);
    });

    it('sets focus on click', () => {
      render(<Tag {...requiredProps} />);

      userEvent.click(screen.getAllByRole('gridcell')[1]);

      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      render(<Tag {...requiredProps} id="unique-id" />);
      expect(screen.getByText('Test Title').parentElement).toHaveAttribute('id', 'unique-id');
    });

    it('sets the content ID', () => {
      render(<Tag {...requiredProps} id="unique-id" />);
      expect(screen.getByText('Test Title')).toHaveAttribute('id', 'unique-id-content');
    });

    it('sets the clear button ID', () => {
      render(<Tag {...requiredProps} id="unique-id" />);
      expect(screen.getByRole('button')).toHaveAttribute('id', 'unique-id-button');
    });
  });

  describe('onClear API', () => {
    it('calls the onClear handler when the icon is clicked', () => {
      const onClearSpy = jest.fn();

      render(<Tag {...requiredProps} onClear={onClearSpy} />);

      userEvent.click(screen.getAllByRole('gridcell')[1]);

      expect(onClearSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('readOnly API', () => {
    it('does not render a clear button if readOnly is true', () => {
      render(<Tag {...requiredProps} readOnly={true} />);

      expect(screen.getAllByRole('gridcell').length).toEqual(1);
    });
  });
});
