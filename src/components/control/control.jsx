import PropTypes from 'prop-types';
import React from 'react';

/**
 * Generic control component for interactive widgets.
 * Establishes layout and behavior for:
 * - interactive widget
 * - label
 * - validation message
 */
export default function FieldControl(props) {
  // Temporarily disabled while we figure out how to be compatible with the ReactWrapper (backbone view)
  // The backbone view renders the React component in-memory so this always throws.
  // useLayoutEffect(() => {
  //   if (window.document.getElementById(props.labelledBy)) return;
  //   throw new Error('<Control> is missing a visible label.');
  // }, []);

  // Temporarily disabled while we figure out how to be compatible with the ReactWrapper (backbone view)
  // The backbone view renders the React component in-memory so this always throws.
  // useLayoutEffect(() => {
  //   if (window.document.querySelector('[aria-describedby]', props.validationMessageId)) return;
  //
  //   throw new Error('<Control> was used without an element on the DOM being described by it. ' +
  //     'Please add `aria-describedby` to the element this control is being used to describe.');
  // }, []);

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

FieldControl.propTypes = {
  children: PropTypes.node.isRequired,
};

FieldControl.defaultProps = {};
