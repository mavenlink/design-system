import React from 'react';
import PropTypes from 'prop-types';

export default function Listbox(props) {
  return (<div>{ props.children }</div>);
}

Listbox.propTypes = {
  children: PropTypes.node,
};

Listbox.defaultProps = {
  children: null,
};
