import PropTypes from 'prop-types';
import React from 'react';
import ComponentsList from './components-list';

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
function sortBy(key) {
  return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
}

export default function ComponentsListContainer(props) {
  const location = window.location.hash.replace(/\W/g, '') || 'Overview';
  const shouldAlphabetize = !props.items.some(item => item.heading);
  // const items = shouldAlphabetize ? sortBy(props.items, 'name') : props.items;
  const items = shouldAlphabetize ? props.items.concat().sort(sortBy('name')) : props.items;
  return <ComponentsList {...props} items={items} current={location} />;
}

ComponentsListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.bool,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
