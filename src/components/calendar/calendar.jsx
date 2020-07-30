import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';

function getDateIterator(year, month) {
  const firstDate = new Date(year, month, 1);
  return new Date(year, month, 1 - firstDate.getDay());
}

function getDateIteratorDate(iterator) {
  const date = iterator.getDate();
  iterator.setDate(date + 1);
  return date;
}

function getDateIteratorWeekday(iterator) {
  const date = iterator.getDate();
  const weekday = iterator.toLocaleDateString(undefined, {
    weekday: 'short',
  });
  iterator.setDate(date + 1);
  return weekday;
}

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
  const iterator = getDateIterator(year, month);
  const headIterator = new Date(iterator.getTime());

  return (
    <React.Fragment>
      <div>
        <button onClick={onPreviousMonthPress}>Prev</button>
        {calendarDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
        })}
        <button onClick={onNextMonthPress}>Next</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>{getDateIteratorWeekday(headIterator)}</th>
            <th>{getDateIteratorWeekday(headIterator)}</th>
            <th>{getDateIteratorWeekday(headIterator)}</th>
            <th>{getDateIteratorWeekday(headIterator)}</th>
            <th>{getDateIteratorWeekday(headIterator)}</th>
            <th>{getDateIteratorWeekday(headIterator)}</th>
            <th>{getDateIteratorWeekday(headIterator)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
          </tr>
          <tr>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
          </tr>
          <tr>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
          </tr>
          <tr>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
          </tr>
          <tr>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
          </tr>
          <tr>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
            <td>{getDateIteratorDate(iterator)}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

Calendar.propTypes = {
  value: PropTypes.string,
};

Calendar.defaultProps = {
  value: undefined,
};

export default Calendar;
