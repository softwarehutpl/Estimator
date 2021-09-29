import { riskMultiplicator } from '../constants/constants';
import { Task } from '../types/Interface';

export const recalculateTask = (task?: Task) => {
  if (!task) return 0;

  const { minMd, maxMd, risk } = task;

  //TODO delete
  // console.log('task', task);

  if (minMd == null || maxMd == null) return 0;

  const valueToRound = (((maxMd - minMd) / 2) * riskMultiplicator[risk]) % 0.5;

  const roundedValue = Math.round(valueToRound);

  const value = ((maxMd - minMd) / 2) * riskMultiplicator[risk] - valueToRound;

  //TODO delete
  // console.log('value', value);
  // console.log('ValueToRound', valueToRound);
  // console.log('Rounded', roundedValue);
  // console.log('result', minMd + value);

  return minMd + value;
};
