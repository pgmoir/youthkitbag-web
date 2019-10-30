export const compareForSameDate = (sourceDateTime, previousDate) => {
  if (!previousDate) {
    previousDate = { day: 0, month: 0, year: 0 };
  }
  const thisDateTime = new Date(sourceDateTime);
  const thisDate = {
    day: thisDateTime.getDate(),
    month: thisDateTime.getMonth(),
    year: thisDateTime.getFullYear()
  };
  const isSameDate =
    previousDate.day === thisDate.day &&
    previousDate.month === thisDate.month &&
    previousDate.year === thisDate.year;
  return {
    isSameDate: isSameDate,
    sourceDate: isSameDate ? undefined : thisDateTime,
    newPreviousDate: thisDate
  };
};

export const formatDate = thisDate => {
  return 'No date';
};
