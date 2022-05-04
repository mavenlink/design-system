import React, {
  createRef,
} from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import IconButton from './icon-button.jsx';

describe('<IconButton />', () => {
  const requiredProps = {
    icon: {
      id: 'test-id',
      viewBox: '1 2 3 4',
    },
    label: 'Test label',
    onPress: () => {},
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<IconButton {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toBe(document.activeElement);
    expect(ref.current).toMatchSnapshot();
  });

  describe('active API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} active />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });

    it('can be unset', () => {
      render(<IconButton {...requiredProps} active={false} />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} className="unique-class-name" />);
      expect(screen.getByRole('button', { name: 'Test label' })).toHaveClass('unique-class-name');
    });
  });

  describe('disabled API', () => {
    it('can be set', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} disabled={true} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
      user.click(screen.getByRole('button'));
      expect(onPressSpy).not.toBeCalled();
    });

    it('can be unset', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} disabled={false} />);
      expect(screen.getByRole('button')).not.toBeDisabled();
      user.click(screen.getByRole('button'));
      expect(onPressSpy).toBeCalled();
    });
  });

  describe('icon API', () => {
    it('sets the xlink:href', () => {
      render(<IconButton {...requiredProps} icon={{ ...requiredProps.icon, id: 'unique-id' }} />);
      expect(screen.getByRole('button', { name: 'Test label' }).children[1]).toHaveAttribute('xlink:href', '#unique-id');
    });

    it('sets the height', () => {
      render(<IconButton {...requiredProps} icon={{ ...requiredProps.icon, viewBox: '1 2 3 41' }} />);
      expect(screen.getByRole('button', { name: 'Test label' })).toHaveAttribute('height', '41');
    });

    it('sets the width', () => {
      render(<IconButton {...requiredProps} icon={{ ...requiredProps.icon, viewBox: '1 2 42 4' }} />);
      expect(screen.getByRole('button', { name: 'Test label' })).toHaveAttribute('width', '42');
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      const ref = createRef();

      render((
        <React.Fragment>
          <input aria-labelledby="unique-id" ref={ref} />
          <IconButton {...requiredProps} label="unique label" id="unique-id" />
        </React.Fragment>
      ));

      expect(screen.getByLabelText('unique label')).toBe(ref.current);
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} label="Unique label" />);
      expect(screen.getByRole('button', { name: 'Unique label' })).toBeInTheDocument();
    });
  });

  describe('labelledBy API', () => {
    it('can be set', () => {
      render((
        <React.Fragment>
          <label id="label-id">Unique label</label>
          <IconButton {...requiredProps} labelledBy="label-id" />
        </React.Fragment>
      ));
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('onPress API', () => {
    it('is called on click', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} role="button" />);
      user.click(screen.getByRole('button'));
      expect(onPressSpy).toBeCalledWith(expect.objectContaining({ target: expect.anything() }));
    });

    it('is called on enter keypress', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} role="button" />);
      user.tab();
      user.keyboard('{Enter}');
      expect(onPressSpy).toBeCalledWith(expect.objectContaining({
        defaultPrevented: true,
        target: expect.anything(),
      }));
    });

    it('is called on space keypress', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} role="button" />);
      user.tab();
      user.keyboard(' ');
      expect(onPressSpy).toBeCalledWith(expect.objectContaining({
        defaultPrevented: true,
        target: expect.anything(),
      }));
    });
  });

  describe('onBlur API', () => {
    it('bubbles up the blur event', () => {
      const onBlurSpy = jest.fn(event => event.persist());
      render(<>
        <IconButton {...requiredProps} onBlur={onBlurSpy} role="button" />
        <input data-testid="element-to-blur-to" />
        </>);
      user.click(screen.getByRole('button'));
      screen.queryByTestId("element-to-blur-to").focus();
      expect(onBlurSpy).toBeCalledWith(expect.objectContaining({
        target: expect.anything(),
      }));
    });
  });


  describe('onFocus API', () => {
    it('bubbles up the blur event', () => {
      const onFocusSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onFocus={onFocusSpy} role="button"/>);

      user.click(screen.getByRole('button'));
      expect(onFocusSpy).toBeCalledWith(expect.objectContaining({
        target: expect.anything(),
      }));
    });
  });
});
