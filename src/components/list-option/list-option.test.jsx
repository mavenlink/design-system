import React, {
  createRef,
} from 'react';
import renderer from 'react-test-renderer';
import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListOption from './list-option.jsx';

describe('src/components/list-option/list-option', () => {
  const requiredProps = {
    children: 'Test option',
    value: 'test-option',
  };

  it('renders defaults', () => {
    const tree = renderer.create(<ListOption {...requiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('children API', () => {
    it('accepts a node as children', () => {
      render(<ListOption {...requiredProps}><div><span>Text is here!</span></div></ListOption>);
      expect(screen.getByText('Text is here!')).toBeInTheDocument();
    });
  });

  describe('defaultActive API', () => {
    it('can be set', () => {
      render(<ListOption {...requiredProps} defaultActive={true} />);
      expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '0');
    });

    it('can be unset', () => {
      render(<ListOption {...requiredProps} defaultActive={false} />);
      expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('onSelect API', () => {
    it('is called when selecting by a mouse click', () => {
      const onSelectSpy = jest.fn();
      render(<ListOption {...requiredProps} onSelect={onSelectSpy} selected={false} />);
      userEvent.click(screen.getByText('Test option'));
      expect(onSelectSpy).toHaveBeenCalled();
    });

    it('is called when selecting by a keyboard key', () => {
      const onSelectSpy = jest.fn();
      render(<ListOption {...requiredProps} onSelect={onSelectSpy} selected={false} />);
      fireEvent.keyDown(screen.getByText('Test option'), { key: 'Enter' });
      expect(onSelectSpy).toHaveBeenCalled();
    });

    it('is called when deselecting by a mouse click', () => {
      const onSelectSpy = jest.fn();
      render(<ListOption {...requiredProps} onSelect={onSelectSpy} selected={true} />);
      userEvent.click(screen.getByText('Test option'));
      expect(onSelectSpy).toHaveBeenCalled();
    });

    it('is called when deselecting by a keyboard key', () => {
      const onSelectSpy = jest.fn();
      render(<ListOption {...requiredProps} onSelect={onSelectSpy} selected={true} />);
      fireEvent.keyDown(screen.getByText('Test option'), { key: 'Enter' });
      expect(onSelectSpy).toHaveBeenCalled();
    });
  });

  describe('selected API', () => {
    it('is selected when selected is true', () => {
      render(<ListOption {...requiredProps} selected={true} />);
      expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'true');
    });

    it('is not selected when selected is false', () => {
      render(<ListOption {...requiredProps} selected={false} />);
      expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('ref API', () => {
    describe('contains', () => {
      it('finds the container element', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} ref={ref} />);
        expect(ref.current.contains(screen.getByText('Test option'))).toBe(true);
      });

      it('finds a child element', () => {
        const ref = createRef();
        render((
          <ListOption {...requiredProps} ref={ref}>
            <div>Nested child</div>
          </ListOption>
        ));
        expect(ref.current.contains(screen.getByText('Nested child'))).toBe(true);
      });
    });

    describe('setActive', () => {
      it('sets active', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} ref={ref} />);
        act(() => ref.current.setActive(true));
        expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '0');
      });

      it('unsets active', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} ref={ref} />);
        act(() => ref.current.setActive(false));
        expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '-1');
      });
    });

    describe('setSelected', () => {
      it('sets selected', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} ref={ref} />);
        act(() => ref.current.setSelected(true));
        expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'true');
      });

      it('unsets selected', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} ref={ref} />);
        act(() => ref.current.setSelected(false));
        expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false');
      });
    });

    describe('setVisible', () => {
      it('sets visible', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} ref={ref} />);
        act(() => ref.current.setVisible(true));
        expect(screen.getByText('Test option')).not.toHaveClass('hidden');
      });

      it('unsets visible', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} ref={ref} />);
        act(() => ref.current.setVisible(false));
        expect(screen.getByText('Test option')).toHaveClass('hidden');
      });
    });

    describe('value', () => {
      it('has the value prop', () => {
        const ref = createRef();
        render(<ListOption {...requiredProps} value="unique-value" ref={ref} />);
        expect(ref.current.value).toEqual('unique-value');
      });
    });
  });

  describe('title API', () => {
    it('accepts a title', () => {
      const title = "Hello. Is it me you're looking for?";
      render(<ListOption {...requiredProps} title={title} />);
      expect(screen.getByText('Test option')).toHaveAttribute('title', title);
    });
  });

  describe('value API', () => {
    it('sets it on the ref', () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} value="unique-value" ref={ref} />);
      expect(ref.current.value).toEqual('unique-value');
    });
  });

  describe('className API', () => {
    it('accepts a className', () => {
      const className = 'foo-bar';
      render(<ListOption {...requiredProps} className={className} />);
      expect(screen.getByText('Test option')).toHaveClass('foo-bar');
    });
  });
});
