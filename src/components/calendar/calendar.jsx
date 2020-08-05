import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import arrowLeft from '../../svgs/arrow-left.svg';
import arrowRight from '../../svgs/arrow-right.svg';
import caretDown from '../../svgs/caret-down.svg';
import IconButton from '../icon-button/icon-button.jsx';
import Icon from '../icon/icon.jsx';
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

function Calendar(props) {
  const highlightedDate = new Date(props.value ? `${props.value}T00:00` : Date.now());
  const [year, setYear] = useState(highlightedDate.getFullYear());
  const [month, setMonth] = useState(highlightedDate.getMonth());
  const [active, setActive] = useState(false);
  const [focusedDate, setFocusedDate] = useState(new Date(props.value ? `${props.value}T00:00` : Date.now()));
  let refs = {};

  const getCell = (iterator, cellMonth, cellHighlightedDate) => {
    const date = iterator.getDate();
    const className = getCellClassName(iterator, cellMonth, cellHighlightedDate);
    const ref = React.createRef();

    const cellRef = {};
    cellRef[iterator.toDateString()] = ref;
    refs = { ...cellRef, ...refs };

    const sameDate = iterator.getDate() === focusedDate.getDate() && iterator.getMonth() === focusedDate.getMonth();
    const tabIndex = sameDate ? 0 : null;

    // This needs to occur at the end of this function
    iterator.setDate(date + 1); return (
      <td tabIndex={tabIndex} className={className} ref={ref} >
        {date}
      </td>
    );
  };

  useEffect(() => {
    const ref = refs[focusedDate.toDateString()];
    if (ref) {
      ref.current.focus();
    }
  }, [focusedDate]);

  function handleKeyboardDateChange(dateAmount) {
    const newDate = new Date(focusedDate.setDate(focusedDate.getDate() + dateAmount));
    setFocusedDate(newDate);
    const ref = refs[newDate.toDateString()];
    if (!ref) {
      changeMonth(Math.abs(dateAmount) / dateAmount);
    }
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange(-1);
        }
        break;
      case 'ArrowUp':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange(-7);
        }
        break;
      case 'ArrowRight':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange(1);
        }
        break;
      case 'ArrowDown':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange(7);
        }
        break;
      case 'End':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange(6 - focusedDate.getDay());
        }
        break;
      case 'Home':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange(0 - focusedDate.getDay());
        }
        break;
      case 'PageUp':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange(0);
        }
        break;
      case 'PageDown':
        if (active) {
          event.preventDefault();
          handleKeyboardDateChange();
        }
        break;
      default:
    }
  }

  function onFocus(event) {
    const activeRef = Object.values(refs).find(ref => ref.current.contains(event.target));
    if (activeRef) {
      setActive(true);
    }
  }

  function onPreviousMonthPress() {
    changeMonth(-1);
  }

  function onNextMonthPress() {
    changeMonth(1);
  }

  function changeMonth(monthAmount) {
    const tmpDate = new Date(year, month + monthAmount);
    setMonth(tmpDate.getMonth());
    setYear(tmpDate.getFullYear());
  }

  const previousCalendarMonth = new Date(year, month - 1);
  const currentCalendarMonth = new Date(year, month);
  const nextCalendarMonth = new Date(year, month + 1);
  const iterator = getDateIterator(year, month);
  const headIterator = new Date(iterator.getTime());

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IconButton
          icon={arrowLeft}
          label={`Change calendar to ${previousCalendarMonth.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
          })}`}
          onClick={onPreviousMonthPress}
        />
        <button
          className={styles['year-button']}
        >
          {currentCalendarMonth.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
          })}
          <Icon icon={caretDown} v={2} />
        </button>
        <IconButton
          icon={arrowRight}
          label={`Change calendar to ${nextCalendarMonth.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
          })}`}
          onClick={onNextMonthPress}
        />
      </div>
      <table lassName={styles['calendar-grid']} role="grid" onKeyDown={onKeyDown} onFocus={onFocus} >
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
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
          </tr>
          <tr>
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
            {getCell(iterator, month, highlightedDate, refs)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Calendar.propTypes = {
  value: PropTypes.string,
  refs: PropTypes.Object,
};

Calendar.defaultProps = {
  value: undefined,
};

export default Calendar;
