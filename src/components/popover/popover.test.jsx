import React, { useRef, Fragment } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from './popover.jsx';

describe('Popover', () => {
  function PopoverWithToggle(popoverProps) {
    const popoverRef = useRef();

    return (
      <Fragment>
        <button onClick={() => { popoverRef.current.open = true; }}>Open Popover</button>
        <button onClick={() => { popoverRef.current.open = false; }}>Close Popover</button>
        <span>Some text</span>
        <Popover ref={popoverRef} {...popoverProps}>{popoverProps.children}</Popover>
      </Fragment>
    );
  }

  it('has defaults', () => {
    const popoverRef = React.createRef();

    render(<Popover title="Defaults" />);
    expect(document.body).toMatchSnapshot();

    render(<Popover title="Defaults" startOpen={true} />);
    expect(document.body).toMatchSnapshot();

    render(<Popover ref={popoverRef} title="Defaults with ref" />);
    expect(popoverRef.current).toMatchSnapshot();
  });

  it('has a title', () => {
    render(<PopoverWithToggle title="Another title" />);

    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByRole('dialog', { name: 'Another title' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<PopoverWithToggle title="Another title"><span>More text</span></PopoverWithToggle>);

    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByText('More text'));
  });

  it('can be toggled open/closed', () => {
    render(<PopoverWithToggle title="Another title" />);

    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByText('Another title')).toBeInTheDocument();

    userEvent.click(screen.getByText('Close Popover'));
    expect(screen.queryByText('Another title')).not.toBeInTheDocument();
  });

  it('can be closed by clicking elsewhere in the window', () => {
    render(<PopoverWithToggle title="Another title" />);

    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByText('Another title')).toBeInTheDocument();

    userEvent.click(screen.getByText('Some text'));
    expect(screen.queryByText('Another title')).not.toBeInTheDocument();
  });

  it('can be closed by focusing outside', () => {
    render(<PopoverWithToggle title="Another title" />);

    userEvent.click(screen.getByText('Open Popover'));

    userEvent.tab();
    userEvent.tab();
    expect(screen.getByText('Open Popover')).toHaveFocus();
    expect(screen.queryByText('Another title')).not.toBeInTheDocument();
  });

  it('opens with focus on the close iconbutton', () => {
    render(<PopoverWithToggle title="Another title" />);

    userEvent.click(screen.getByText('Open Popover'));
    expect(document.activeElement).toContainElement(screen.getByTitle('Close popover'));
  });

  it('can be closed by activating the close iconbutton', () => {
    render(<PopoverWithToggle title="Another title" />);

    userEvent.click(screen.getByText('Open Popover'));
    userEvent.click(document.activeElement);
    expect(screen.queryByText('Another title')).toEqual(null);

    userEvent.click(screen.getByText('Open Popover'));
    fireEvent.keyDown(document.activeElement, { key: 'Spacebar' });
    expect(screen.queryByText('Another title')).toEqual(null);

    userEvent.click(screen.getByText('Open Popover'));
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(screen.queryByText('Another title')).toEqual(null);
  });

  it('does not close when clicking within itself', () => {
    render(<PopoverWithToggle title="Another title"><span>More text</span></PopoverWithToggle>);

    userEvent.click(screen.getByText('Open Popover'));
    userEvent.click(screen.getByText('More text'));
    expect(screen.getByText('Another title').tagName).toEqual('H1');
  });

  describe('flush api', () => {
    it('can flush left', () => {
      render(<PopoverWithToggle title="Another title" flush="left"><span>More text</span></PopoverWithToggle>);
      userEvent.click(screen.getByText('Open Popover'));
      expect(screen.getByRole('dialog')).toHaveStyle({ left: 0 });
      expect(screen.getByRole('dialog')).not.toHaveStyle({ right: 0 });
    });

    it('can flush right', () => {
      render(<PopoverWithToggle title="Another title" flush="right"><span>More text</span></PopoverWithToggle>);
      userEvent.click(screen.getByText('Open Popover'));
      expect(screen.getByRole('dialog')).toHaveStyle({ right: 0 });
      expect(screen.getByRole('dialog')).not.toHaveStyle({ left: 0 });
    });
  });
});
