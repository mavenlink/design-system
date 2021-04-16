import PropTypes from 'prop-types';
import React from 'react';
import ComponentsList from './components-list.jsx';

export default function ComponentsListContainer(props) {
  return <ComponentsList {...props} items={props.items} />;
}

ComponentsListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.bool,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
