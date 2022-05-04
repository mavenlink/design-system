import React  from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import Date from './date';

describe('<Date />', () => {
  describe('onActivate API', () => {
    it('toggles date to active when user clicks on date control', () => {
      const onActivate = jest.fn();
      render(<>
        <Date id="test-id" labelledBy="label-id" onActivate={onActivate} />
      </>);

      user.click(screen.getByRole('textbox'));
      expect(onActivate).toHaveBeenCalledWith(undefined);
    });

    it('toggles date and sends value at time when user clicks on date control', () => {
      const onActivate = jest.fn();
      render(<>
        <Date id="test-id" labelledBy="label-id" value='2022-01-01' onActivate={onActivate} />
      </>);

      user.click(screen.getByRole('textbox'));
      expect(onActivate).toHaveBeenCalledWith(new window.Date('2022-01-01T00:00:00'));
    });
  });

  describe('onDeactivate API', () => {
    it('toggles date to active when user clicks on date control', () => {
      const onDeactivate = jest.fn();
      render(<>
        <Date id="test-id" labelledBy="label-id" onDeactivate={onDeactivate} />
        <button aria-label='click away button' />
      </>);

      user.click(screen.getByRole('textbox'));
      user.click(screen.getByLabelText('click away button'));
      expect(onDeactivate).toHaveBeenCalledWith(undefined);
    });
  });
});
