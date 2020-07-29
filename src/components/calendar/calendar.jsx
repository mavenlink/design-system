import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';

function Calendar(props) {
  const valueDate = new Date(props.value ? props.value : Date.now());
  const [year] = useState(valueDate.getFullYear());
  const [month, setMonth] = useState(valueDate.getMonth());
  const [date] = useState(valueDate.getDate());

  function onPreviousMonthPress() {
    setMonth(month - 1);
  }

  function onNextMonthPress() {
    setMonth(month + 1);
  }

  const calendarDate = new Date(year, month, date);

  return (
    <div>
      <button onClick={onPreviousMonthPress}>Prev</button>
      {calendarDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      })}
      <button onClick={onNextMonthPress}>Next</button>
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
