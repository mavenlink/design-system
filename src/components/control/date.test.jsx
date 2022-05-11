import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import Date from './date.jsx';

describe('<Date />', () => {
  describe('onFocus API', () => {
    it('toggles date to active when user clicks on date control', () => {
      const onFocus = jest.fn(event => event.persist());
      render(<>
        <Date id="test-id" onFocus={onFocus} />
      </>);

      const input = screen.getByRole('textbox');
      user.click(input);
      expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
        target: input,
      }));
    });
  });

  describe('onDeactivate API', () => {
    it('toggles active when user clicks away from the date control', () => {
      const onDeactivate = jest.fn();
      render(<>
        <Date id="test-id" onDeactivate={onDeactivate} />
        <button aria-label="click away button" />
      </>);

      user.click(screen.getByRole('textbox'));
      user.click(screen.getByLabelText('click away button'));
      expect(onDeactivate).toHaveBeenCalledWith(undefined);
    });

    it('deactivate when user tabs out of the Input', () => {
      const onDeactivate = jest.fn();
      render(<>
        <button aria-label="pre input button" />
        <Date id="test-id" value="2022-01-01" onDeactivate={onDeactivate} />
        <button aria-label="click away button" />
      </>);

      // User has Focused on Element Before Date Input
      user.click(screen.getByRole('button', { name: 'pre input button' }));

      // User Tabs to the Date Input
      user.tab();
      expect(onDeactivate).not.toHaveBeenCalled();
      expect(screen.getByDisplayValue('2022-01-01')).toHaveFocus();

      // User Tabs to the Calendar Button (Still Part of the Date Input)
      user.tab();
      expect(onDeactivate).not.toHaveBeenCalled();
      expect(screen.getByRole('button', { name: 'calendar button' })).toHaveFocus();

      // User Tabs to button outside of calendar input
      user.tab();
      expect(screen.getByRole('button', { name: 'click away button' })).toHaveFocus();
      expect(onDeactivate).toHaveBeenCalledWith(new window.Date('2022-01-01'));
    });
  });
});
