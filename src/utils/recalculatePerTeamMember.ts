import { Main } from '../types/Interface';

export const recalculatePerTeamMember = (total: Main, teamSize: number) => {
  const { minMd, maxMd, predictedMd } = total;

  const min = minMd ? minMd / teamSize : 0;
  const max = maxMd ? maxMd / teamSize : 0;
  const predicted = predictedMd ? predictedMd / teamSize : 0;

  return {
    minMd: Number(min.toFixed(2)),
    maxMd: Number(max.toFixed(2)),
    predictedMd: Number(predicted.toFixed(2)),
  };
};
