import moment from 'moment';

export const getDaysBetween = (endDate: string, startDate: string) => {
  const end = moment(endDate);
  const start = moment(startDate);

  return end.diff(start, 'days');
};
