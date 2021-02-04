export const compareForSameDate = (sourceDateTime, previousDate) => {
  if (!previousDate) {
    previousDate = { day: 0, month: 0, year: 0 };
  }
  const thisDateTime = new Date(sourceDateTime);
  const thisDate = {
    day: thisDateTime.getDate(),
    month: thisDateTime.getMonth(),
    year: thisDateTime.getFullYear(),
  };
  const isSameDate =
    previousDate.day === thisDate.day &&
    previousDate.month === thisDate.month &&
    previousDate.year === thisDate.year;
  return {
    isSameDate: isSameDate,
    sourceDate: isSameDate ? undefined : thisDateTime,
    newPreviousDate: thisDate,
  };
};

export const formatDateTime = (thisDate) => {
  var date = new Date(thisDate);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
  return dateTimeFormat.format(date);
};

export const formatDate = (thisDate) => {
  var date = new Date(thisDate);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
  };
  const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
  return dateTimeFormat.format(date);
};

export const getTimeSpan = (thisDate) => {
  if (!thisDate) return;
  return formatDateTime(thisDate);
};

export const getDateSpan = (thisDate) => {
  if (!thisDate) return;
  return formatDate(thisDate);
};
