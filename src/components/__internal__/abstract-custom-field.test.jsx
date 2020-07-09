import React from 'react';
import { render, screen } from '@testing-library/react';
import AbstractCustomField from './abstract-custom-field.jsx';
import Icon from '../icon/icon.jsx';
import calendarSvg from '../../svgs/icon-calendar-fill.svg';

describe('AbstractCustomField', () => {
  const sharedProps = {
    label: 'Test label',
    id: 'test-id',
  };

  describe('icon API', () => {
    it('shows an icon when provided', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" />;
      const { getByRole } = render(<AbstractCustomField {...sharedProps} icon={icon} />);
      expect(getByRole('img')).toBeDefined();
    });

    it('gives preference to the error icon', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" title="Hello" />;
      const { queryByTitle, getByRole } = render(<AbstractCustomField {...sharedProps} icon={icon} errorText="yo" />);
      expect(queryByTitle('Hello')).toBeNull();
      expect(getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('shows no icon by default', () => {
      const { queryByRole } = render(<AbstractCustomField {...sharedProps} />);
      expect(queryByRole('img')).toBeNull();
    });
  });

  describe('max API', () => {
    it('sets the max attribute', () => {
      render(<AbstractCustomField {...sharedProps} max={5} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('max', '5');
    });

    it('allows a date string', () => {
      render(<AbstractCustomField {...sharedProps} max="2001-09-11" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('max', '2001-09-11');
    });
  });

  describe('min API', () => {
    it('sets the min attribute', () => {
      render(<AbstractCustomField {...sharedProps} min={-5} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('min', '-5');
    });

    it('allows a date string', () => {
      render(<AbstractCustomField {...sharedProps} min="2001-09-11" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('min', '2001-09-11');
    });
  });

  describe('step API', () => {
    it('sets the step attribute', () => {
      render(<AbstractCustomField {...sharedProps} step={2} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('step', '2');
    });
  });

  describe('type API', () => {
    it('can be set to `number`', () => {
      render(<AbstractCustomField {...sharedProps} type="number" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'number');
    });

    it('can be set to `text`', () => {
      render(<AbstractCustomField {...sharedProps} type="text" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'text');
    });

    it('can be set to `date`', () => {
      render(<AbstractCustomField {...sharedProps} type="date" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
    });
  });
});
