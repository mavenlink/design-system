import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './calendar.css';

function getDateIterator(year, month) {
  const firstDate = new Date(year, month, 1);
  return new Date(year, month, 1 - firstDate.getDay());
}

function getHeadCell(iterator) {
  const date = iterator.getDate();
  const weekday = iterator.toLocaleDateString(undefined, {
    weekday: 'narrow',
  });

  // This needs to occur at the end of this function
  iterator.setDate(date + 1);

  return (
    <th className={styles.weekday}>
      {weekday}
    </th>
  );
}

function getCellClassName(iterator, month, highlightedDate) {
  if (
    highlightedDate.getFullYear() === iterator.getFullYear()
    && highlightedDate.getMonth() === iterator.getMonth()
    && highlightedDate.getDate() === iterator.getDate()
  ) return styles['highlighted-date'];

  if (iterator.getMonth() === month) return styles.date;

  return styles['not-current-date'];
}

function getCell(iterator, month, highlightedDate) {
  const date = iterator.getDate();
  const className = getCellClassName(iterator, month, highlightedDate);

  // This needs to occur at the end of this function
  iterator.setDate(date + 1);

  return (
    <td className={className}>
      {date}
    </td>
  );
}

function Calendar(props) {
  const highlightedDate = new Date(props.value ? props.value : Date.now());
  const [year, setYear] = useState(highlightedDate.getFullYear());
  const [month, setMonth] = useState(highlightedDate.getMonth());
  const [date] = useState(highlightedDate.getDate());

  function onPreviousMonthPress() {
    const tmpDate = new Date(year, month - 1);
    setMonth(tmpDate.getMonth());
    setYear(tmpDate.getFullYear());
  }

  function onNextMonthPress() {
    const tmpDate = new Date(year, month + 1);
    setMonth(tmpDate.getMonth());
    setYear(tmpDate.getFullYear());
  }

  const calendarDate = new Date(year, month, date);
  const iterator = getDateIterator(year, month);
  const headIterator = new Date(iterator.getTime());

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles['month-button']}
          onClick={onPreviousMonthPress}
        >
          Prev
        </button>
        <button
          className={styles['year-button']}
        >
          {calendarDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
          })}
        </button>
        <button
          className={styles['month-button']}
          onClick={onNextMonthPress}
        >
            Next
        </button>
      </div>
      <table className={styles['calendar-grid']}>
        <thead>
          <tr>
            {getHeadCell(headIterator)}
            {getHeadCell(headIterator)}
            {getHeadCell(headIterator)}
            {getHeadCell(headIterator)}
            {getHeadCell(headIterator)}
            {getHeadCell(headIterator)}
            {getHeadCell(headIterator)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
            {getCell(iterator, month, highlightedDate)}
          </tr>
        </tbody>
      </table>
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
