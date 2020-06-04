import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { waitFor } from '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TagList from './tag-list.jsx';

describe('TagList', () => {
  const requiredProps = {
    children: <span>Test Fake Tag</span>,
    refs: [createRef()],
  };

  it('renders a TagList', () => {
    const tree = renderer
      .create((
        <TagList {...requiredProps} />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('children API', () => {
    it('can be set', () => {
      render(<TagList {...requiredProps}>Unique children</TagList>);
      expect(screen.getByText('Unique children')).toBeDefined();
    });
  });

  describe('active, focus useEffect', () => {
    it('child can be focused when active', async () => {
      const refs = [createRef()];
      render(<TagList {...requiredProps} refs={refs}><span role="button" tabIndex={0} ref={refs[0]}>Test Child</span></TagList>);

      userEvent.click(screen.getByText('Test Child'));

      await waitFor(() => expect(screen.getByText('Test Child')).toHaveFocus());
    });

    it('child will not be focused when inactive', async () => {
      const refs = [createRef()];
      render(<TagList {...requiredProps} refs={refs}><span role="button" tabIndex={0} ref={refs[0]}>Test Child</span></TagList>);

      await waitFor(() => expect(screen.getByText('Test Child')).not.toHaveFocus());
    });
  });

  describe('keyboard navigation', () => {
    it('moves focus on arrow keys', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <span role="button" tabIndex={0} ref={refs[0]}>Test Child 1</span>
          <span role="button" tabIndex={0} ref={refs[1]}>Test Child 2</span>
          <span role="button" tabIndex={0} ref={refs[2]}>Test Child 3</span>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 1')); // keyDown literally sends the keyDown event, no focusing happens, so we click first

      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowRight' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());

      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowDown' });
      await waitFor(() => expect(screen.getByText('Test Child 3')).toHaveFocus());

      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowUp' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());

      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowLeft' });
      await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
    });

    it('activeIndex stays inside ref array upper bound', async () => {
      const refs = [createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <span role="button" tabIndex={0} ref={refs[0]}>Test Child 1</span>
          <span role="button" tabIndex={0} ref={refs[1]}>Test Child 2</span>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 1'));

      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowRight' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());
      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowRight' });
      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowLeft' });
      await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
    });

    it('activeIndex stays inside ref array lower bound', async () => {
      const refs = [createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <span role="button" tabIndex={0} ref={refs[0]}>Test Child 1</span>
          <span role="button" tabIndex={0} ref={refs[1]}>Test Child 2</span>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 1'));

      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowLeft' });
      await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowLeft' });
      fireEvent.keyDown(screen.getByText('Test Child 1'), { key: 'ArrowRight' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());
    });
  });
});
