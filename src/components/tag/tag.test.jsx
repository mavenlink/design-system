import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tag from './tag.jsx';

describe('Tag', () => {
  const requiredProps = {
    id: 'test-id',
  };

  it('renders a tag component', () => {
    const tree = renderer
      .create((
        <Tag {...requiredProps}>Test Title</Tag>
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses a title', () => {
    render(<Tag {...requiredProps}>Test Title</Tag>);
    expect(screen.getByText('Test Title').tagName).toEqual('SPAN');
  });

  describe('Focus Behavior', () => {
    it('moves focus with arrow key', () => {
      render(<Tag {...requiredProps}>Test Title</Tag>);

      fireEvent.keyDown(screen.getByText('Test Title'), { key: 'ArrowRight' });

      expect(screen.getByText('Test Title')).not.toEqual(document.activeElement);
      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);

      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });

      expect(screen.getByText('Test Title')).not.toEqual(document.activeElement);
      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);
    });

    it('sets focus on click', () => {
      render(<Tag {...requiredProps}>Test Title</Tag>);

      userEvent.click(screen.getAllByRole('gridcell')[1]);

      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);
    });
  });

  describe('onClear API', () => {
    it('calls the onClear handler when the icon is clicked', () => {
      const onClearSpy = jest.fn();

      render(<Tag {...requiredProps} onClear={onClearSpy}>Test Title</Tag>);

      userEvent.click(screen.getAllByRole('gridcell')[1]);

      expect(onClearSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('readOnly API', () => {
    it('does not render a clear button if readOnly is true', () => {
      render(<Tag {...requiredProps} readOnly={true}>Test Title</Tag>);

      expect(screen.getAllByRole('gridcell').length).toEqual(1);
    });
  });
});
