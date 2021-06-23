import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Tooltip from './tooltip.jsx';

describe('tooltip', () => {
  const requiredProps = {
    children: <div id="my-component" aria-describedby="my-component-tooltip">Child</div>,
    id: 'my-component-tooltip',
    text: 'Help Text',
  };

  it('has defaults', () => {
    render(<Tooltip {...requiredProps} />);
    expect(screen.getByText('Child').parentElement).toMatchSnapshot();

    user.hover(screen.getByText('Child'));
    expect(screen.getByText('Help Text')).toBeInTheDocument();

    expect(screen.getByText('Child').parentElement).toMatchSnapshot();
  });

  describe('hovering behavior', () => {
    it('does not render the tooltip unless the child is hovered', () => {
      render(<Tooltip {...requiredProps} />);
      expect(screen.getByText('Child')).not.toHaveDescription('Help Text');
    });

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
      expect(screen.getByRole('textbox')).toHaveFocus();
      expect(screen.getByRole('textbox')).toHaveDescription('Help Text');
    });

    it('removes the description when the child is no longer focused', () => {
      render(<Tooltip {...requiredProps}>{children}</Tooltip>);
      user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
      expect(screen.getByRole('textbox')).toHaveDescription('Help Text');

      user.tab();
      expect(screen.getByRole('textbox')).not.toHaveFocus();
      expect(screen.getByRole('textbox')).not.toHaveDescription('Help Text');
    });
  });

  describe('disabled api', () => {
    it('does not show on hover when disabled', () => {
      render(<Tooltip {...requiredProps} disabled={true} />);
      user.hover(screen.getByText('Child'));
      expect(screen.getByText('Child')).not.toHaveDescription('Help Texts');
    });

    it('does not show on focus when disabled', () => {
      render(
        <Tooltip {...requiredProps} disabled={true}>
          <input id="my-component" />
        </Tooltip>,
      );

      user.tab();
      expect(screen.getByRole('textbox')).not.toHaveDescription('Help Texts');
    });
  });

  describe('direction api', () => {
    it('allows top', () => {
      render(<Tooltip {...requiredProps} direction="top" />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });

    it('allows bottom', () => {
      render(<Tooltip {...requiredProps} direction="bottom" />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });

    it('allows left', () => {
      render(<Tooltip {...requiredProps} direction="left" />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });

    it('allows right', () => {
      render(<Tooltip {...requiredProps} direction="right" />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });
  });

  describe('truncate api', () => {
    it('adds the class if true', () => {
      render(<Tooltip {...requiredProps} truncate />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });

    it('does not add the class if false', () => {
      render(<Tooltip {...requiredProps} truncate={false} />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });
  });

  describe('className api', () => {
    it('can be supplied', () => {
      render(<Tooltip {...requiredProps} className="my-dope-class" />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });

    it('defaults to `tooltip`', () => {
      render(<Tooltip {...requiredProps} className={undefined} />);
      expect(screen.getByText('Child').parentElement).toMatchSnapshot();
    });
  });
});
