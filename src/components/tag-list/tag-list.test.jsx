import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { waitFor } from '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TagList from './tag-list.jsx';
import Tag from '../Tag/tag.jsx';

describe('TagList', () => {
  const requiredProps = {
    children: <Tag id="test-tag-fake">Test Fake Tag</Tag>,
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
      render(<TagList {...requiredProps} refs={refs}><Tag id="test-tag-1" ref={refs[0]}>Test Child</Tag></TagList>);

      userEvent.click(screen.getByText('Test Child'));

      await waitFor(() => expect(screen.getByText('Test Child')).toHaveFocus());
    });

    it('child will not be focused when inactive', async () => {
      const refs = [createRef()];
      render(<TagList {...requiredProps} refs={refs}><Tag id="test-tag-1" ref={refs[0]}>Test Child</Tag></TagList>);

      await waitFor(() => expect(screen.getByText('Test Child')).not.toHaveFocus());
    });
  });

  describe('keyboard navigation', () => {
    it('moves focus on arrow keys', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <Tag id="test-tag-1" ref={refs[0]}>Test Child 1</Tag>
          <Tag id="test-tag-2" ref={refs[1]}>Test Child 2</Tag>
          <Tag id="test-tag-3" ref={refs[2]}>Test Child 3</Tag>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 1')); // keyDown literally sends the keyDown event, no focusing happens, so we click first

      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      await waitFor(() => expect(screen.getByText('Test Child 3')).toHaveFocus());

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());

      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
    });

    it('activeIndex stays inside ref array upper bound', async () => {
      const refs = [createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <Tag id="test-tag-1" ref={refs[0]}>Test Child 1</Tag>
          <Tag id="test-tag-2" ref={refs[1]}>Test Child 2</Tag>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 1'));

      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
    });

    it('activeIndex stays inside ref array lower bound', async () => {
      const refs = [createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <Tag id="test-tag-1" ref={refs[0]}>Test Child 1</Tag>
          <Tag id="test-tag-2" ref={refs[1]}>Test Child 2</Tag>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 1'));

      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());
    });

    it('focuses extremity elements on End and Home keyDown', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <Tag id="test-tag-1" ref={refs[0]}>Test Child 1</Tag>
          <Tag id="test-tag-2" ref={refs[1]}>Test Child 2</Tag>
          <Tag id="test-tag-3" ref={refs[2]}>Test Child 3</Tag>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 1'));

      fireEvent.keyDown(document.activeElement, { key: 'End' });
      await waitFor(() => expect(screen.getByText('Test Child 3')).toHaveFocus());
      fireEvent.keyDown(document.activeElement, { key: 'Home' });
      await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
    });
  });

  describe('click focusing', () => {
    it('sets the activeIndex and focuses the clicked child element', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <TagList {...requiredProps} refs={refs}>
          <Tag id="test-tag-1" ref={refs[0]}>Test Child 1</Tag>
          <Tag id="test-tag-2" ref={refs[1]}>Test Child 2</Tag>
          <Tag id="test-tag-3" ref={refs[2]}>Test Child 3</Tag>
        </TagList>
      ));

      userEvent.click(screen.getByText('Test Child 2'));
      await waitFor(() => expect(screen.getByText('Test Child 2')).toHaveFocus());
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
      await waitFor(() => expect(screen.getByText('Test Child 3')).toHaveFocus());
    });
  });
});
