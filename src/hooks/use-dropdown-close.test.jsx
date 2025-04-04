import React, {
  useRef,
  useState,
} from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useDropdownClose from './use-dropdown-close.js';

describe('useDropdownClose', () => {
  function TestComponent() {
    const ref = useRef();
    const [opened, setOpened] = useState(false);

    function onClose() {
      setOpened(false);
    }

    function onFocus() {
      setOpened(true);
    }

    useDropdownClose(ref, opened, onClose);

    return (
      <div
        onFocus={onFocus}
        ref={ref}
        tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      >
        {opened ? 'opened' : 'closed'}
      </div>
    );
  }

  it('can be used in a component', () => {
    render(<TestComponent />);
    expect(document.body).toMatchSnapshot();
  });

  it('stays opens', () => {
    render(<TestComponent />);
    userEvent.tab();
    expect(screen.getByText('opened')).toBeInTheDocument();
    userEvent.click(screen.getByText('opened'));
    expect(screen.getByText('opened')).toBeInTheDocument();
  });

  it('closes on blur', () => {
    render((
      <React.Fragment>
        <TestComponent />
        <input />
      </React.Fragment>
    ));
    userEvent.tab();
    expect(screen.getByText('opened')).toBeInTheDocument();
    userEvent.tab();
    expect(screen.getByText('closed')).toBeInTheDocument();
  });

  it('closes on click away', () => {
    render(<TestComponent />);
    userEvent.tab();
    expect(screen.getByText('opened')).toBeInTheDocument();
    userEvent.click(document.body);
    expect(screen.getByText('closed')).toBeInTheDocument();
  });
});
