import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import HelpIcon from './help-icon.jsx';

describe('HelpIcon', () => {
  const requiredProps = {
    id: 'help-tooltip',
    label: 'Icon Label',
    text: 'Help Text',
  };

  it('has defaults', () => {
    render(<HelpIcon {...requiredProps} />);
    expect(document.body).toMatchSnapshot();

    user.hover(screen.getByTitle('Icon Label'));
    expect(document.body).toMatchSnapshot();
  });

  describe('hovering behavior', () => {
    it('does not render the tooltip unless the child is hovered', () => {
      render(<HelpIcon {...requiredProps} />);
      expect(screen.queryByText('Help Text')).not.toBeInTheDocument();
    });

    it('renders the tooltip when the icon is hovered over', () => {
      render(<HelpIcon {...requiredProps} />);
      user.hover(screen.getByTitle('Icon Label'));
      expect(screen.getByText('Help Text')).toBeInTheDocument();
    });

    it('removes the tooltip when the icon is no longer hovered', () => {
      render(<HelpIcon {...requiredProps} />);

      user.hover(screen.getByTitle('Icon Label'));
      expect(screen.getByText('Help Text')).toBeInTheDocument();

      user.unhover(screen.getByTitle('Icon Label'));
      expect(screen.queryByText('Help Text')).not.toBeInTheDocument();
    });
  });

  describe('direction api', () => {
    it('allows top', () => {
      render(<HelpIcon {...requiredProps} direction="top" />);
      expect(document.body).toMatchSnapshot();
    });

    it('allows bottom', () => {
      render(<HelpIcon {...requiredProps} direction="bottom" />);
      expect(document.body).toMatchSnapshot();
    });

    it('allows left', () => {
      render(<HelpIcon {...requiredProps} direction="left" />);
      expect(document.body).toMatchSnapshot();
    });

    it('allows right', () => {
      render(<HelpIcon {...requiredProps} direction="right" />);
      expect(document.body).toMatchSnapshot();
    });
  });
});
