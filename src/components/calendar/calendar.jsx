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
    weekday: 'short',
  });
  iterator.setDate(date + 1);

  return (
    <th className={styles.weekday}>
      {weekday}
    </th>
  );
}

function getCell(iterator, month) {
  const date = iterator.getDate();
  const dateMonth = iterator.getMonth();
  iterator.setDate(date + 1);

  return (
    <td className={dateMonth === month ? styles.date : styles['inactive-date']}>
      {date}
    </td>
  );
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
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
          </tr>
          <tr>
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
          </tr>
          <tr>
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
          </tr>
          <tr>
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
          </tr>
          <tr>
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
          </tr>
          <tr>
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
            {getCell(iterator, month)}
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
