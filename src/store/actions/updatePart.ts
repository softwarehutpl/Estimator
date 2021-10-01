import { Part } from "../../types/Interface";

export const updatePart = (updatedValue: Part) => {
  const {
    role,
    minMd,
    maxMd,
    predictedMd,
    procent,
    name,
    minMdFormula,
    maxMdFormula,
    predictedMdFormula,
  } = updatedValue;
  const part = {
    minMd: minMd * procent,
    minMdFormula,
    maxMd: maxMd * procent,
    maxMdFormula,
    name,
    procent,
    predictedMd: predictedMd * procent,
    predictedMdFormula,
    role,
  };
  return part;
};
