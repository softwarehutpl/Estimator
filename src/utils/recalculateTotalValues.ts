import { Fields, Main, Part } from '../types/Interface';

const sumValues = (parts: Part[], addValue: number = 0, calcField: string) => {
  const result = parts.reduce((total, curr) => {
    return (total += curr[calcField as keyof Part] as number);
  }, 0);

  if (isNaN(result)) return 0;

  return Math.ceil(result + addValue);
};

export const recalculateTotalValues = (main: Main, parts: Part[]) => {
  const { minMd, maxMd, predictedMd, risk } = main;

  const minSum = sumValues(parts, minMd, Fields.MIN_MD);
  const maxSum = sumValues(parts, maxMd, Fields.MAX_MD);
  const predictedSum = sumValues(parts, predictedMd, Fields.PREDICTED_MD);
  const riskSum = sumValues(parts, risk, Fields.RISK);

  return { minMd: minSum, maxMd: maxSum, predictedMd: predictedSum, risk: riskSum };
};
