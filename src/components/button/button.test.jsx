import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './button.jsx';

describe('Button', () => {
  it('has defaults', () => {
    render((
      <Button>
        Hello world!
      </Button>
    ));
    expect(document.body).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      render((
        <Button className="prioritize-me" color="primary">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveClass('prioritize-me');
    });

    it('has a fallback to color prop', () => {
      render((
        <Button color="primary">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveClass('primary');
    });
  });

  describe('color API', () => {
    it('can be "primary"', () => {
      render((
        <Button color="primary">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveClass('primary');
    });

    it('can be "secondary"', () => {
      render((
        <Button color="secondary">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveClass('secondary');
    });

    it('can be "subtle"', () => {
      render((
        <Button color="subtle">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveClass('subtle');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      render((
        <Button disabled={true}>
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toBeDisabled();
    });

    it('can be enabled', () => {
      render((
        <Button disabled={false}>
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toBeEnabled();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render((
        <Button name="test-name">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveAttribute('name', 'test-name');
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      render((
        <Button id="test-id">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('onClick API', () => {
    it('sets the onclick handler', () => {
      const onClickSpy = jest.fn();
      render((
        <Button onClick={onClickSpy}>
          Hello world!
        </Button>
      ));
      fireEvent.click(screen.getByText('Hello world!'));
      expect(onClickSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('type API', () => {
    it('can be "button"', () => {
      render((
        <Button type="button">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveAttribute('type', 'button');
    });

    it('can be "reset"', () => {
      render((
        <Button type="reset">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveAttribute('type', 'reset');
    });

    it('can be "submit"', () => {
      render((
        <Button type="submit">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveAttribute('type', 'submit');
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      render((
        <Button value="test-value">
          Hello world!
        </Button>
      ));
      expect(screen.getByText('Hello world!')).toHaveAttribute('value', 'test-value');
    });
  });
});
