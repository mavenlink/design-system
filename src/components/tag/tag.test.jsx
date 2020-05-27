import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Tag from './tag.jsx';

describe('Tag', () => {
  it('renders a tag component', () => {
    const tree = renderer
      .create((
        <Tag title="Test Title" />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses a title', () => {
    render(<Tag title="Test Title" />);
    expect(screen.getByText('Test Title').tagName).toEqual('SPAN');
  });

  describe('Focus Behavior', () => {
    it('moves focus with arrow key', () => {
      render(<Tag title="Test Title" />);
      expect(screen.getByText('Test Title')).toEqual(document.activeElement);
      expect(screen.getAllByRole('gridcell')[1]).not.toEqual(document.activeElement);

      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });

      expect(screen.getByText('Test Title')).not.toEqual(document.activeElement);
      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);

      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });

      expect(screen.getByText('Test Title')).not.toEqual(document.activeElement);
      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);
    });

    it('sets focus on click', () => {
      render(<Tag title="Test Title" />);
      expect(screen.getByText('Test Title')).toEqual(document.activeElement);

      fireEvent.click(screen.getAllByRole('gridcell')[1]);

      expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);
    });
  });

  describe('onClear API', () => {
    it('calls the onClear handler when the icon is clicked', () => {
      const onClearSpy = jest.fn();

      render(<Tag title="Test Title" onClear={onClearSpy} />);

      fireEvent.click(screen.getAllByRole('gridcell')[1]);

      expect(onClearSpy.mock.calls.length).toEqual(1);
    });
  });
});
