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
  const uniqueWeekday = iterator.toLocaleDateString(undefined, {
    weekday: 'short',
  });

  iterator.setDate(date + 1);

  return (
    <th key={`header-${uniqueWeekday}`} className={styles.weekday}>
      {weekday}
    </th>
  );
}

function getCellClassName(iterator, month, highlightedDate) {
  const isHighlightedDate =
    highlightedDate.getFullYear() === iterator.getFullYear()
    && highlightedDate.getMonth() === iterator.getMonth()
    && highlightedDate.getDate() === iterator.getDate();

  if (isHighlightedDate) return styles['highlighted-date'];

  if (iterator.getMonth() === month) return styles.date;

  return styles['not-current-date'];
}

function isEndDate(date) {
  const nextDate = new Date(date.getYear(), date.getMonth(), date.getDate() + 1);
  return date.getMonth() !== nextDate.getMonth();
}

function getDaysInMonth(date, nextMonth) {
  let month = date.getMonth() + nextMonth;
  if (isEndDate(date)) month += 1;
  return new Date(date.getYear(), month, 0).getDate();
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
    const dateMonth = iterator.getMonth();
    const className = getCellClassName(iterator, cellMonth, cellHighlightedDate);
    const ref = React.createRef();

    const cellRef = {};
    cellRef[iterator.toDateString()] = ref;
    refs = { ...cellRef, ...refs };

    const sameDate = date === focusedDate.getDate() && dateMonth === focusedDate.getMonth();
    const tabIndex = sameDate ? 0 : null;

    // This needs to occur at the end of this function
    iterator.setDate(date + 1); return (
      <td key={`${dateMonth}-${date}`} tabIndex={tabIndex} className={className} ref={ref} >
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

  function handleKeyboardYearChange(direction) {
    changeMonth(12 * direction);
    const newDate = new Date(focusedDate.getFullYear() + direction, focusedDate.getMonth(), focusedDate.getDate());
    setFocusedDate(newDate);
  }

  function handleKeyboardDateChange(dateAmount) {
    const newDate = new Date(focusedDate.setDate(focusedDate.getDate() + dateAmount));
    setFocusedDate(newDate);
    const ref = refs[newDate.toDateString()];
    if (!ref) changeMonth(Math.abs(dateAmount) / dateAmount);
  }

  function onKeyDown(event) {
    const keyDownKeyHandlers = {
      ArrowLeft: () => handleKeyboardDateChange(-1),
      ArrowUp: () => handleKeyboardDateChange(-7),
      ArrowRight: () => handleKeyboardDateChange(1),
      ArrowDown: () => handleKeyboardDateChange(7),
      End: () => handleKeyboardDateChange(6 - focusedDate.getDay()),
      Home: () => handleKeyboardDateChange(0 - focusedDate.getDay()),
      PageUp: () => {
        if (event.shiftKey) {
          handleKeyboardYearChange(-1);
        } else {
          changeMonth(-1);
          handleKeyboardDateChange(-getDaysInMonth(focusedDate, 0));
        }
      },
      PageDown: () => {
        if (event.shiftKey) {
          handleKeyboardYearChange(1);
        } else {
          changeMonth(1);
          handleKeyboardDateChange(getDaysInMonth(focusedDate, 1));
        }
      },
    };

    if (active) {
      if (Object.keys(keyDownKeyHandlers).includes(event.key)) {
        event.preventDefault();
        keyDownKeyHandlers[event.key]();
      }
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
          className={styles['change-month-button']}
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
          <Icon
            className={styles['change-year-icon']}
            icon={caretDown}
            v={2}
          />
        </button>
        <IconButton
          className={styles['change-month-button']}
          icon={arrowRight}
          label={`Change calendar to ${nextCalendarMonth.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
          })}`}
          onClick={onNextMonthPress}
        />
      </div>
      <table className={styles['calendar-grid']} role="grid" onKeyDown={onKeyDown} onFocus={onFocus} >
        <thead>
          <tr>
            {[...Array(7)].map(() => getHeadCell(headIterator))}
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map(() => (
            <tr key={iterator.getTime()}>
              {[...Array(7)].map(() => getCell(iterator, month, highlightedDate))}
            </tr>
          ))}
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
