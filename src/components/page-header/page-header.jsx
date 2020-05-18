import PropTypes from 'prop-types';
import React from 'react';

export default function PageHeader(props) {
  return (
    <h1>{props.title}</h1>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

PageHeader.defaultProps = {
};
