import { Section } from '../../types/Interface';

export const sectionUpdate = (
  section: Section,
  updatedValues: {
    maxMd: number;
    minMd: number;
    predictedMd: number;
    risk: number;
  }
) => {
  const { maxMd, minMd, predictedMd, risk } = updatedValues;

  return { ...section, maxMd, minMd, predictedMd, risk };
};
