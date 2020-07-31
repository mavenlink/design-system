import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from './icon-button.jsx';

describe('<IconButton />', () => {
  const requiredProps = {
    label: 'Test label',
    icon: {
      id: 'test-id',
      viewBox: '1 2 3 4',
    },
    onClick: () => {},
  };

  it('has defaults', () => {
    render(<IconButton {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('label prop API', () => {
    it('can be set', () => {
      render(<IconButton {...requiredProps} label="Unique label" />);
      expect(screen.getByRole('button', { name: 'Unique label' })).toBeInTheDocument();
    });
  });

  describe('icon prop API', () => {
    it('sets the xlink:href', () => {
      render(<IconButton {...requiredProps} icon={{ ...requiredProps.icon, id: 'unique-id' }} />);
      expect(screen.getByRole('button', { name: 'Test label' }).children[1]).toHaveAttribute('xlink:href', '#unique-id');
    });

    it('sets the width', () => {
      render(<IconButton {...requiredProps} icon={{ ...requiredProps.icon, viewBox: '1 2 3 41'}} />);
      expect(screen.getByRole('button', { name: 'Test label' })).toHaveAttribute('height', '41');
    });

    it('sets the width', () => {
      render(<IconButton {...requiredProps} icon={{ ...requiredProps.icon, viewBox: '1 2 42 4'}} />);
      expect(screen.getByRole('button', { name: 'Test label' })).toHaveAttribute('width', '42');
    });
  });

  describe('onClick prop API', () => {
    it('can be set', () => {
      const onClickSpy = jest.fn();
      render(<IconButton {...requiredProps} onClick={onClickSpy} />);
      userEvent.click(screen.getByRole('button', { name: 'Test label' }));
      expect(onClickSpy).toHaveBeenCalledWith(expect.anything());
    });
  });
});
