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
    expect(document.body).toMatchSnapshot();

    user.hover(screen.getByText('Child'));
    expect(document.body).toMatchSnapshot();
  });

  it('errors if the tooltip is not describing any elements', () => {
    expect(() => {
      render(
        <Tooltip {...requiredProps}>
          <input />
        </Tooltip>,
      );
    }).toThrowError('<Tooltip> was used without an element on the DOM being described by it. ' +
      'Please add `aria-describedby` to the element this tooltip is being used to describe.');
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
      user.hover(screen.getByText('Child'));
      expect(document.getElementById(requiredProps.id)).toMatchSnapshot();
    });

    it('allows bottom', () => {
      render(<Tooltip {...requiredProps} direction="bottom" />);
      user.hover(screen.getByText('Child'));
      expect(document.getElementById(requiredProps.id)).toMatchSnapshot();
    });

    it('allows left', () => {
      render(<Tooltip {...requiredProps} direction="left" />);
      user.hover(screen.getByText('Child'));
      expect(document.getElementById(requiredProps.id)).toMatchSnapshot();
    });

    it('allows right', () => {
      render(<Tooltip {...requiredProps} direction="right" />);
      user.hover(screen.getByText('Child'));
      expect(document.getElementById(requiredProps.id)).toMatchSnapshot();
    });
  });

  describe('truncate api', () => {
    it('adds the class if true', () => {
      render(<Tooltip {...requiredProps} truncate={true} />);
      user.hover(screen.getByText('Child'));
      expect(document.getElementById(requiredProps.id)).toMatchSnapshot();
    });

    it('does not add the class if false', () => {
      render(<Tooltip {...requiredProps} truncate={false} />);
      user.hover(screen.getByText('Child'));
      expect(document.getElementById(requiredProps.id)).toMatchSnapshot();
    });
  });

  describe('className api', () => {
    it('can be overridden', () => {
      render(<Tooltip {...requiredProps} className="my-dope-class" />);
      user.hover(screen.getByText('Child'));
      expect(document.getElementById(requiredProps.id)).toMatchSnapshot();
    });
  });
});
