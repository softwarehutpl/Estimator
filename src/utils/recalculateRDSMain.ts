import { Main, Project } from '../types/Interface';
import { calculateRisk } from './recalculateRow';

export const RDSmain = (value: Project): Main => {
  const reducer = (accumulator: number, curr: number) => accumulator + curr;
  const minMd = [...value.sections.map((section) => section.minMd)].reduce(reducer); //[];
  const maxMd = [...value.sections.map((section) => section.maxMd)].reduce(reducer);
  const predictedMd = [...value.sections.map((section) => section.predictedMd)].reduce(reducer);

  const calculatedValue = {
    maxMd,
    maxMdFormula: '',
    minMd,
    minMdFormula: '',
    predictedMd,
    predictedMdFormula: '',
    risk: calculateRisk(maxMd, predictedMd),
    riskFormula: '',
  };

  return calculatedValue;
};
