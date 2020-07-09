import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
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

  describe('accessibility', () => {
    describe('focus interactions', () => {
      it('moves focus with arrow key', async () => {
        render(<Tag {...requiredProps} />);

        fireEvent.keyDown(screen.getByText('Test Title'), { key: 'ArrowRight' });

        await waitFor(() => expect(screen.getByText('Test Title')).not.toEqual(document.activeElement));
        expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);

        fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });

        await waitFor(() => expect(screen.getByText('Test Title')).not.toEqual(document.activeElement));
        expect(screen.getAllByRole('gridcell')[1]).toEqual(document.activeElement);
      });

      it('sets focus on click', async () => {
        render(<Tag {...requiredProps} />);

        userEvent.click(screen.getByRole('button'));

        await waitFor(() => expect(screen.getByRole('button').parentElement).toEqual(document.activeElement));
      });
    });

    describe('page tab sequence management', () => {
      it('has defaults', () => {
        render(<Tag {...requiredProps} />);
        expect(screen.getAllByRole('gridcell')[0]).toHaveAttribute('tabindex', '0');
        expect(screen.getAllByRole('gridcell')[1]).toHaveAttribute('tabindex', '-1');
      });

      it('can be set', () => {
        const ref = createRef();
        render(<Tag {...requiredProps} ref={ref} />);
        act(() => { ref.current.setIsActive(true); });
        expect(screen.getAllByRole('gridcell')[0]).toHaveAttribute('tabindex', '0');
        expect(screen.getAllByRole('gridcell')[1]).toHaveAttribute('tabindex', '-1');
      });

      it('can be unset', () => {
        const ref = createRef();
        render(<Tag {...requiredProps} ref={ref} />);
        act(() => { ref.current.setIsActive(false); });
        expect(screen.getAllByRole('gridcell')[0]).toHaveAttribute('tabindex', '-1');
        expect(screen.getAllByRole('gridcell')[1]).toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('children API', () => {
    it('can be set', () => {
      render(<Tag {...requiredProps}>Unique children</Tag>);
      expect(screen.getByText('Unique children')).toBeDefined();
    });
  });

  describe('defaultActive API', () => {
    it('can be set', () => {
      render(<Tag {...requiredProps} defaultActive={true} />);
      expect(screen.getAllByRole('gridcell')[0]).toHaveAttribute('tabindex', '0');
      expect(screen.getAllByRole('gridcell')[1]).toHaveAttribute('tabindex', '-1');
    });

    it('can be unset', () => {
      render(<Tag {...requiredProps} defaultActive={false} />);
      expect(screen.getAllByRole('gridcell')[0]).toHaveAttribute('tabindex', '-1');
      expect(screen.getAllByRole('gridcell')[1]).toHaveAttribute('tabindex', '-1');
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

  describe('onRemove API', () => {
    it('calls the onRemove handler when the icon is clicked', () => {
      const ref = createRef();
      const onRemoveSpy = jest.fn();
      render(<Tag {...requiredProps} onRemove={onRemoveSpy} ref={ref} />);
      userEvent.click(screen.getByRole('button'));
      expect(onRemoveSpy).toHaveBeenCalledWith({ target: expect.anything() });
    });

    it('calls the onRemove handler when enter key is pressed', () => {
      const ref = createRef();
      const onRemoveSpy = jest.fn();
      render(<Tag {...requiredProps} onRemove={onRemoveSpy} ref={ref} />);
      userEvent.tab();
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      expect(screen.getAllByRole('gridcell')[1]).toHaveFocus();
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(onRemoveSpy).toHaveBeenCalledWith({ target: expect.anything() });
    });

    it('calls the onRemove handler when space key is pressed', () => {
      const ref = createRef();
      const onRemoveSpy = jest.fn();
      render(<Tag {...requiredProps} onRemove={onRemoveSpy} ref={ref} />);
      userEvent.tab();
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      expect(screen.getAllByRole('gridcell')[1]).toHaveFocus();
      fireEvent.keyDown(document.activeElement, { key: ' ' });
      expect(onRemoveSpy).toHaveBeenCalledWith({ target: expect.anything() });
    });
  });

  describe('readOnly API', () => {
    it('does not render a clear button when readOnly', () => {
      render(<Tag {...requiredProps} readOnly={true} />);

      expect(screen.queryAllByRole('button').length).toEqual(0);
    });

    it('render a clear button when not readOnly', () => {
      render(<Tag {...requiredProps} readOnly={false} />);

      expect(screen.getAllByRole('button').length).toEqual(1);
    });
  });

  describe('setIsActive ref API', () => {
    it('sets focus', async () => {
      const ref = createRef();
      render(<Tag {...requiredProps} ref={ref} />);

      await waitFor(() => expect(screen.getAllByRole('gridcell')[0]).not.toHaveFocus());

      act(() => { ref.current.setIsActive(true); });

      await waitFor(() => expect(screen.getAllByRole('gridcell')[0]).toHaveFocus());
    });
  });
});
