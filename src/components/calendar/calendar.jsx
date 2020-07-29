import React from 'react';
import PropTypes from 'prop-types';

function Calendar(props) {
  const date = new Date(props.value ? props.value : Date.now());

  return (
    <div>
      {date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      })}
    </div>
  );
}

Calendar.propTypes = {
  value: PropTypes.string,
};

Calendar.defaultProps = {
  value: undefined,
};

export default Calendar;
