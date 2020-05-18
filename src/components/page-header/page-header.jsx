import PropTypes from 'prop-types';
import React from 'react';

export default function PageHeader(props) {
  return (
    <header>
      <h1>{props.title}</h1>
      {props.description && <p>{props.description}</p>}
    </header>
  );
}

PageHeader.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

PageHeader.defaultProps = {
  description: undefined,
};
