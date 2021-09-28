// Takes in user input (String), returns time in minutes (Number)
// eg. timeToMinutes('45 min') -> 45
function timeToMinutes(value) {
  const colonMatch = /(\d*):(\d*)/.exec(value);
  if (colonMatch) {
    return ((parseInt(colonMatch[1], 10) || 0) * 60) + (parseInt(colonMatch[2], 10) || 0);
  } else if (/\d\s*[hmd]/i.test(value)) {
    let minutes = 0;

    const dMatch = /([\d.]+)\s*d/i.exec(value);
    const daysMatch = /([\d.]+)\s*day/i.exec(value);
    const hMatch = /([\d.]+)\s*h/i.exec(value);
    const hourMatch = /([\d.]+)\s*hour/i.exec(value);
    const mMatch = /([\d.]+)\s*m/i.exec(value);
    const minMatch = /([\d.]+)\s*min/i.exec(value);
    const emptyMinuteMatch = /\s([\d.]+)/i.exec(value);

    if (daysMatch) {
      minutes += parseFloat(daysMatch[1]) * 60 * 24;
    } else if (dMatch) {
      minutes += parseFloat(dMatch[1]) * 60 * 24;
    }

    if (hMatch) {
      minutes += parseFloat(hMatch[1]) * 60;
    } else if (hourMatch) {
      minutes += parseFloat(hourMatch[1]) * 60;
    }

    if (mMatch) {
      minutes += parseInt(mMatch[1], 10);
    } else if (minMatch) {
      minutes += parseInt(minMatch[1], 10);
    } else if (emptyMinuteMatch) {
      minutes += parseInt(emptyMinuteMatch[1], 10);
    }
    return minutes;
  }
  const hoursValue = parseFloat(value);
  if (isNaN(hoursValue)) {
    return undefined;
  }
  return Math.ceil(hoursValue * 60);
}

// Takes in time in minutes (Number), returns formatted time (String)
// eg. formatTime(120) -> '2h 00'
function formatTime(time) {
  if (!time) { return undefined; }

  const hours = Math.floor(time / 60);
  const minutes = Math.ceil(time % 60);
  const prefixZero = minutes < 10 ? '0' : '';
  return `${hours}h ${prefixZero}${minutes}`;
}

// Below are examples of putting both functions together, to take userInput and convert it to a nice formatted output
// formatTime(timeToMinutes(userInput))
// | userInput | minutes | formattedTime |
// | --- | --- | --- |
// | 2 | 120 | 2h 00 |
// | 3h | 180 | 3h 00 |
// | 4.5 | 270 | 4h 30 |
// | .25 | 15 | 0h 15 |
// | 45m | 45 | 0h 45 |
// | 45 min | 45 | 0h 45 |
// | 1 hour 30 min | 90 | 1h 30 |
// | 1h 15 | 75 | 1h 15 |
// | 2:30 | 150 | 2h 30 |
// | 1.5d | 864 | 36h 00 |
// | 3 days | 1728 | 72h 00
// | 2 days 2 hours 2 mins | 1202 | 50h 02 |

export { timeToMinutes, formatTime };
