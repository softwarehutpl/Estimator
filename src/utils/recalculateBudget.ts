import { getDaysBetween } from './getDaysBetween';

export const recalculateBudget = (
  startDate: string = '',
  endDate: string = '',
  teamSize: number = 1
) => {
  const daysBetween = getDaysBetween(endDate, startDate);

  return Math.floor(daysBetween / 7) * 5 * teamSize;
};
