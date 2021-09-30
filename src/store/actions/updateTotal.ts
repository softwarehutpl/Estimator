import { Main } from '../../types/Interface';

export const updateTotal = (
  total: Main,
  updatedValue: {
    minMd: number;
    maxMd: number;
    predictedMd: number;
    risk: number;
  }
) => {
  const { minMd, maxMd, predictedMd, risk } = updatedValue;

  return { ...total, minMd, maxMd, predictedMd, risk };
};
