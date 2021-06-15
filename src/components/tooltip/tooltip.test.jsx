import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Tooltip from './tooltip.jsx';

describe('tooltip', () => {
  const requiredProps = {
    children: <div id="my-component" aria-describedby="my-component-tooltip">Child</div>,
    id: 'my-component',
    text: 'Help Text',
  };

  it('has defaults', () => {
    render(<Tooltip {...requiredProps} />);
    expect(screen.getByText('Child').parentElement).toMatchSnapshot();

    user.hover(screen.getByText('Child'));
    expect(screen.getByText('Help Text')).toBeInTheDocument();

    expect(screen.getByText('Child').parentElement).toMatchSnapshot();
  });

  it('does not render the tooltip unless the child is hovered', () => {
    render(<Tooltip {...requiredProps} />);
    expect(screen.queryByText('Help Text')).not.toBeInTheDocument();
  });

  describe('hovering behavior', () => {
    it('applies a description to the children when hovered', () => {
      render(<Tooltip {...requiredProps} />);
      user.hover(screen.getByText('Child'));
      expect(screen.getByText('Child')).toHaveDescription('Help Text');
    });

    it('removes the description when the child is no longer hovered', () => {
      render(<Tooltip {...requiredProps} />);

      user.hover(screen.getByText('Child'));
      expect(screen.getByText('Child')).toHaveDescription('Help Text');

      user.unhover(screen.getByText('Child'));
      expect(screen.getByText('Child')).not.toHaveDescription('Help Text');
    });
  });

  describe('focus behavior', () => {
    const children = <input aria-describedby="my-component-tooltip" id="my-component" />;

    it('applies a description to the children when focused', () => {
      render(<Tooltip {...requiredProps}>{children}</Tooltip>);
      user.tab();
      expect(screen.getByRole('textbox')).toHaveDescription('Help Text');
    });

    it('removes the description when the child is no longer focused', () => {
      render(<Tooltip {...requiredProps}>{children}</Tooltip>);
      user.tab();
      expect(screen.getByRole('textbox')).toHaveDescription('Help Text');

      user.tab();
      expect(screen.getByRole('textbox')).not.toHaveDescription('Help Text');
    });
  });
});
