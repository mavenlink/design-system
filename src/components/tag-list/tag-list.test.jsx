import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
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
});
