import React, {
  createRef,
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
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';

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

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate()
  );
}

function getCellClassName(iterator, month, highlightedDate) {
  if (isSameDate(iterator, highlightedDate)) return styles['highlighted-date'];

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
  const defaultDate = props.value ? new Date(`${props.value}T00:00`) : undefined;
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const highlightedDate = new Date(selectedDate ? selectedDate.getTime() : Date.now());
  const [year, setYear] = useState(highlightedDate.getFullYear());
  const [month, setMonth] = useState(highlightedDate.getMonth());
  const [active, setActive] = useState(false);
  const [yearView, setYearView] = useState(false);
  const defaultFocusedDate = new Date(props.value ? `${props.value}T00:00` : Date.now());
  const [focusedDate, setFocusedDate] = useState(defaultFocusedDate);
  const [activeDate, setActiveDate] = useState(defaultFocusedDate);
  let refs = {};

  useEffect(() => {
    const ref = refs[focusedDate.toDateString()];
    setActiveDate(focusedDate);
    if (active && ref) {
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

  function handleMonthPressChange(dateAmount) {
    const newDate = new Date(activeDate.setDate(activeDate.getDate() + dateAmount));
    setActiveDate(newDate);
  }

  function handleDateSelection(date) {
    props.onDateSelected(date);
    setSelectedDate(date);
  }

  function onDateClick(event) {
    const date = new Date(Number(event.target.dataset.epoch));
    handleDateSelection(date);
  }

  function onKeyDown(event) {
    const keyDownKeyHandlers = {
      ArrowLeft: () => handleKeyboardDateChange(-1),
      ArrowUp: () => handleKeyboardDateChange(-7),
      ArrowRight: () => handleKeyboardDateChange(1),
      ArrowDown: () => handleKeyboardDateChange(7),
      End: () => handleKeyboardDateChange(6 - focusedDate.getDay()),
      Enter: () => {
        handleDateSelection(focusedDate);
      },
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
      Space: () => {
        handleDateSelection(focusedDate);
      },
    };

    if (Object.keys(keyDownKeyHandlers).includes(event.key)) {
      event.preventDefault();
      keyDownKeyHandlers[event.key]();
    }
  }

  function onFocus() {
    setActive(true);
  }

  function onPreviousMonthPress() {
    changeMonth(-1);
    handleMonthPressChange(-getDaysInMonth(activeDate, 0));
  }

  function onNextMonthPress() {
    changeMonth(1);
    handleMonthPressChange(getDaysInMonth(activeDate, 1));
  }

  function changeMonth(monthAmount) {
    const tmpDate = new Date(year, month + monthAmount);
    setMonth(tmpDate.getMonth());
    setYear(tmpDate.getFullYear());
  }

  function changeYear(newYear) {
    setYear(newYear.target.current.value.getFullYear());
    const newYearDate = new Date(
      newYear.target.current.value.getFullYear(),
      focusedDate.getMonth(),
      focusedDate.getDate(),
    );
    handleDateSelection(newYearDate);
    setYearView(false);
  }

  const previousCalendarMonth = new Date(year, month - 1);
  const currentCalendarMonth = new Date(year, month);
  const nextCalendarMonth = new Date(year, month + 1);
  const iterator = getDateIterator(year, month);
  const headIterator = new Date(iterator.getTime());
  const yearViewRefs = [...Array(26)].map(() => createRef());

  useEffect(() => {
    if (yearView && yearViewRefs[11].current && yearViewRefs[11].current.rootRef.current.scrollIntoView) {
      yearViewRefs[11].current.rootRef.current.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  }, [yearView]);

  function onChangeYearView() {
    setYearView(!yearView);
  }

  const renderOption = (ref, index) => {
    const startYear = highlightedDate.getFullYear() - 5;
    const listOptionYear = startYear + index;
    const optionDate = new Date(listOptionYear, highlightedDate.getMonth(), highlightedDate.getDate());
    const defaultActive = optionDate.getFullYear() === highlightedDate.getFullYear();
    return (
      <ListOption
        className={styles.option}
        ref={ref}
        onSelect={changeYear}
        key={optionDate}
        value={optionDate}
        defaultActive={defaultActive}
      >
        {optionDate.getFullYear()}
      </ListOption>
    );
  };
  function renderYearOptions() {
    return yearViewRefs.map(renderOption);
  }

  const getCell = () => {
    const date = iterator.getDate();
    const dateMonth = iterator.getMonth();
    const className = getCellClassName(iterator, month, highlightedDate);
    const ref = React.createRef();

    const cellRef = {};
    cellRef[iterator.toDateString()] = ref;
    refs = { ...cellRef, ...refs };

    const sameDateFocusedDate = date === focusedDate.getDate() && dateMonth === focusedDate.getMonth();
    const sameDateActiveDate = date === activeDate.getDate() && dateMonth === activeDate.getMonth();
    const label = iterator.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
    const selected = selectedDate ? isSameDate(iterator, selectedDate) : false;
    const tabIndex = sameDateFocusedDate || sameDateActiveDate ? 0 : null;
    const epoch = iterator.getTime();

    function onCellFocus(event) {
      setFocusedDate(new Date(Number(event.target.dataset.epoch)));
    }

    iterator.setDate(date + 1); return (
      <td
        aria-label={label}
        aria-selected={selected}
        className={className}
        data-epoch={epoch}
        onClick={onDateClick}
        key={`${dateMonth}-${date}`}
        ref={ref}
        role="gridcell"
        tabIndex={tabIndex}
        onFocus={onCellFocus}
      >
        {date}
      </td>
    );
  };

  const onYearKeyDown = (event) => {
    if (event.key === 'Space') {
      onChangeYearView();
    }
  };

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
          onEnter={onPreviousMonthPress}
        />
        <button
          className={styles['year-button']}
          onClick={onChangeYearView}
          onKeyDown={onYearKeyDown}
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
          onEnter={onNextMonthPress}
        />
      </div>
      { yearView ?
        (
          <Listbox value={highlightedDate} className={styles['calendar-year-list']} labelledBy={'year-view'} refs={yearViewRefs} >
            { renderYearOptions() }
          </Listbox>
        )
        :
        (
          <table className={styles['calendar-grid']} role="grid" onKeyDown={onKeyDown} >
            <thead>
              <tr>
                {[...Array(7)].map(() => getHeadCell(headIterator))}
              </tr>
            </thead>
            <tbody onFocus={onFocus}>
              {[...Array(6)].map(() => (
                <tr key={iterator.getTime()}>
                  {[...Array(7)].map(() => getCell())}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

Calendar.propTypes = {
  value: PropTypes.string,
  onDateSelected: PropTypes.func,
};

Calendar.defaultProps = {
  value: undefined,
  onDateSelected: () => {},
};

export default Calendar;
