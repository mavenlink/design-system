import React, {
  createRef,
} from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    render(<IconButton {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('active prop API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} active />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });

    it('can be unset', () => {
      render(<IconButton {...requiredProps} active={false} />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('className prop API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} className="unique-class-name" />);
      expect(screen.getByRole('button', { name: 'Test label' })).toHaveClass('unique-class-name');
    });
  });

  describe('icon prop API', () => {
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

  describe('id prop API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} id="unique-id" />);
      expect(screen.getByRole('button')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('label prop API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} label="Unique label" />);
      expect(screen.getByRole('button', { name: 'Unique label' })).toBeInTheDocument();
    });
  });

  describe('labelledBy prop API', () => {
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

  describe('onPress prop API', () => {
    it('is called on click', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} role="button" />);
      userEvent.click(screen.getByRole('button'));
      expect(onPressSpy).toBeCalledWith(expect.objectContaining({ target: expect.anything() }));
    });

    it('is called on enter keypress', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} role="button" />);
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
      expect(onPressSpy).toBeCalledWith(expect.objectContaining({
        defaultPrevented: true,
        target: expect.anything(),
      }));
    });

    it('is called on space keypress', () => {
      const onPressSpy = jest.fn(event => event.persist());
      render(<IconButton {...requiredProps} onPress={onPressSpy} role="button" />);
      fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
      expect(onPressSpy).toBeCalledWith(expect.objectContaining({
        defaultPrevented: true,
        target: expect.anything(),
      }));
    });
  });

  describe('ref API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<IconButton {...requiredProps} ref={ref} />);
      expect(screen.getByRole('button')).toEqual(ref.current);
    });
  });
});
