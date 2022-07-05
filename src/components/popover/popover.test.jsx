import React, {
  createRef,
  useRef,
  Fragment,
} from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from './popover.jsx';

describe('Popover', () => {
  const requiredProps = {
    title: 'Test title',
  };

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
    render(<Popover ref={popoverRef} title="Defaults" />);
    expect(document.body).toMatchSnapshot();
    expect(popoverRef.current).toMatchSnapshot();
  });

  it('has a title', () => {
    render(<PopoverWithToggle title="Another title" />);

    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByRole('dialog', { name: 'Another title' })).toBeInTheDocument();
  });

  it('has a className api', () => {
    render(<PopoverWithToggle title="Testing" className="unique-stuff" />);
    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByRole('dialog')).toHaveClass('unique-stuff');
  });

  it('has a aria-label when ariaLabel prop is set', () => {
    render(<PopoverWithToggle title="Testing" ariaLabel="This popover is for things" hideHeading />);
    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByLabelText('This popover is for things')).toBeInTheDocument();
  });

  it('hides the title and close button when hideHeading is true', () => {
    render(<PopoverWithToggle title="Testing" hideHeading />);
    userEvent.click(screen.getByText('Open Popover'));
    expect(screen.queryByText('Testing')).not.toBeInTheDocument();
    expect(screen.queryByText('Close popover')).not.toBeInTheDocument();
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

  describe('autoflush API', () => {
    // We don't know how to test this well. Manually QA for now.
  });

  describe('children API', () => {
    it('is set', () => {
      const ref = createRef();
      render((
        <Popover {...requiredProps} ref={ref}>
          Unique popover content
        </Popover>
      ));
      act(() => {
        ref.current.open = true;
      });
      expect(screen.getByText('Unique popover content')).toBeInTheDocument();
    });
  });

  describe('flush API', () => {
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

  describe('onClose API', () => {
    it('is a function', () => {
      const ref = createRef();
      const onClose = jest.fn();
      render(<Popover {...requiredProps} ref={ref} onClose={onClose} />);
      act(() => {
        ref.current.open = true;
      });
      expect(onClose).not.toHaveBeenCalled();
      act(() => {
        ref.current.open = false;
      });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('shouldClose API', () => {
    it('allows closing via clicks', () => {
      const ref = createRef();
      const onClose = jest.fn();
      const shouldClose = () => true;
      render(<Popover {...requiredProps} ref={ref} onClose={onClose} shouldClose={shouldClose} />);
      act(() => {
        ref.current.open = true;
      });
      userEvent.click(document.body);
      expect(onClose).toHaveBeenCalled();
    });

    it('stops closing via clicks', () => {
      const ref = createRef();
      const onClose = jest.fn();
      const shouldClose = () => false;
      render(<Popover {...requiredProps} ref={ref} onClose={onClose} shouldClose={shouldClose} />);
      act(() => {
        ref.current.open = true;
      });
      userEvent.click(document.body);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('allows closing via blur', () => {
      const ref = createRef();
      const onClose = jest.fn();
      const shouldClose = () => true;
      render(<Popover {...requiredProps} ref={ref} onClose={onClose} shouldClose={shouldClose} />);
      act(() => {
        ref.current.open = true;
      });
      userEvent.tab({ shift: true });
      expect(onClose).toHaveBeenCalled();
    });

    it('stops closing via blur', () => {
      const ref = createRef();
      const onClose = jest.fn();
      const shouldClose = () => false;
      render(<Popover {...requiredProps} ref={ref} onClose={onClose} shouldClose={shouldClose} />);
      act(() => {
        ref.current.open = true;
      });
      userEvent.tab({ shift: true });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('title API', () => {
    it('is set', () => {
      const ref = createRef();
      render(<Popover {...requiredProps} ref={ref} title="Unique title" />);
      expect(screen.queryByText('Unique title')).not.toBeInTheDocument();
      act(() => {
        ref.current.open = true;
      });
      expect(screen.getByText('Unique title')).toBeInTheDocument();
    });
  });
});
