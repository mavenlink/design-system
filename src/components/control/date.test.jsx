import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Date from './date.jsx';

describe('<Date />', () => {
  describe('onFocus API', () => {
    it('calls onFocus when user clicks on date control', () => {
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

  describe('onBlur API', () => {
    it('toggles active when user clicks away from the date control', () => {
      const onBlur = jest.fn(event => event.persist());
      render(<>
        <Date id="test-id" onBlur={onBlur} />
        <button aria-label="click away button" />
      </>);

      user.click(screen.getByRole('textbox'));
      user.click(screen.getByLabelText('click away button'));
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        type: 'blur',
      }));
    });

    it('blur when user tabs out of the Input', () => {
      const onBlur = jest.fn(event => event.persist());
      render(<>
        <button aria-label="pre input button" />
        <Date id="test-id" value="2022-01-01" onBlur={onBlur} />
        <button aria-label="click away button" />
      </>);

      // User has Focused on Element Before Date Input
      user.click(screen.getByRole('button', { name: 'pre input button' }));

      // User Tabs to the Date Input
      user.tab();
      expect(onBlur).not.toHaveBeenCalled();
      expect(screen.getByDisplayValue('2022-01-01')).toHaveFocus();

      // User Tabs to the Calendar Button (Still Part of the Date Input)
      user.tab();
      expect(onBlur).not.toHaveBeenCalled();
      expect(screen.getByRole('button', { name: 'calendar button' })).toHaveFocus();

      // User Tabs to button outside of calendar input
      user.tab();
      expect(screen.getByRole('button', { name: 'click away button' })).toHaveFocus();
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        type: 'blur',
      }));
    });
  });
});
