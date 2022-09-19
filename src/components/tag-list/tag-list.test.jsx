import React, { createRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TagList from './tag-list.jsx';
import Tag from '../tag/tag.jsx';

describe('TagList', () => {
  const requiredProps = {
    children: <Tag id="test-tag-fake">Test Fake Tag</Tag>,
    labelledBy: 'test-label-id',
    refs: [createRef()],
  };

  it('renders a TagList', () => {
    render(<TagList {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('accessibility', () => {
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

      it('focuses the remove icon when navigating left to fresh tags', async () => {
        const refs = [createRef(), createRef(), createRef()];
        render((
          <TagList {...requiredProps} refs={refs}>
            <Tag id="test-tag-1" ref={refs[0]}>Test Child 1</Tag>
            <Tag id="test-tag-2" ref={refs[1]}>Test Child 2</Tag>
            <Tag id="test-tag-3" ref={refs[2]}>Test Child 3</Tag>
          </TagList>
        ));

        userEvent.click(screen.getByText('Test Child 3'));

        fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
        await waitFor(() => expect(screen.getAllByRole('button')[1]).toHaveFocus());
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

      it('keeps the activeIndex when not clicking a tag', async () => {
        const refs = [createRef()];
        render((
          <TagList {...requiredProps} refs={refs}>
            <Tag id="test-tag-1" ref={refs[0]}>Test Child 1</Tag>
          </TagList>
        ));

        userEvent.click(screen.getByText('Test Child 1'));
        await waitFor(() => expect(screen.getByText('Test Child 1')).toHaveFocus());
        userEvent.click(screen.getByText('Test Child 1').parentElement.parentElement);
        await waitFor(() => expect(document.body).toHaveFocus());
        expect(screen.getByText('Test Child 1')).toHaveAttribute('tabindex', '0');
      });

      it('child will not be focused when inactive', async () => {
        const refs = [createRef()];
        render((
          <TagList {...requiredProps} refs={refs}>
            <Tag id="test-tag-1" ref={refs[0]}>Test Child</Tag>
          </TagList>
        ));

        await waitFor(() => expect(screen.getByText('Test Child')).not.toHaveFocus());
      });

      it('does not steal focus away when another interactive element is clicked', () => {
        const refs = [createRef()];
        render((
          <TagList {...requiredProps} refs={refs}>
            <Tag id="test-tag-1" ref={refs[0]}>Test Child</Tag>
            <input aria-label="input" />
          </TagList>
        ));

        userEvent.click(screen.getByLabelText('input'));
        expect(screen.getByLabelText('input')).toHaveFocus();
      });
    });
  });

  describe('children API', () => {
    it('can be set', () => {
      render(<TagList {...requiredProps}>Unique children</TagList>);
      expect(screen.getByText('Unique children')).toBeDefined();
    });
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<TagList {...requiredProps} className="unique-class-name" />);
      expect(screen.getByRole('grid')).toHaveAttribute('class', 'unique-class-name');
    });
  });

  describe('labelledBy API', () => {
    it('can be set', () => {
      render(<TagList {...requiredProps} labelledBy="unique-id" />);
      expect(screen.getByRole('grid')).toHaveAttribute('aria-labelledby', 'unique-id');
    });
  });

  describe('onClick API', () => {
    it('can be set', () => {
      const onClickSpy = jest.fn();
      const refs = [createRef()];
      render((
        <TagList {...requiredProps} onClick={onClickSpy} refs={refs}>
          <Tag id="test-tag-fake" ref={refs[0]}>test tag</Tag>
          <input aria-label="test input" />
        </TagList>
      ));

      userEvent.click(screen.getByLabelText('test input'));
      expect(onClickSpy).toHaveBeenCalled();
    });

    it('is not called when clicking a tag', () => {
      const onClickSpy = jest.fn();
      const refs = [createRef()];
      render((
        <TagList {...requiredProps} onClick={onClickSpy} refs={refs}>
          <Tag id="test-tag-fake" ref={refs[0]}>test tag</Tag>
          <input aria-label="test input" />
        </TagList>
      ));

      userEvent.click(screen.getByText('test tag'));
      expect(onClickSpy).not.toHaveBeenCalled();
    });
  });
});
