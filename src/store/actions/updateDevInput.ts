import { Part, Main } from "../../types/Interface";

export const partPropsContstants = {
  ROLE: "role",
  PROCENT: "procent",
  MIN_MD: "minMd",
  MAX_MD: "maxMd",
  PREDICTED_MD: "predictedMd",
  PREDICTED_MD_FORMULA: "predictedMdFormula",
};

export default function updateDevInput(
  part: Part,
  main: Main,
  partProps: string,
  updatedValue: string | boolean | number
) {
  console.log(partProps);
  console.log(updatedValue);
  const { ROLE, MIN_MD, MAX_MD, PREDICTED_MD, PREDICTED_MD_FORMULA, PROCENT } =
    partPropsContstants;

  const updatePart = {
    ...part,
    minMd:
      partProps === MIN_MD
        ? Number(updatedValue) * Number(main.minMd)
        : part.minMd,
    maxMd:
      partProps === MAX_MD
        ? Number(updatedValue) * Number(main.maxMd)
        : part.maxMd,
    predictedMd:
      partProps === PREDICTED_MD
        ? Number(updatedValue) * Number(main.predictedMd)
        : part.predictedMd,
    predictedMdFormula:
      partProps === PREDICTED_MD_FORMULA
        ? (updatedValue as string)
        : part.predictedMdFormula,
    role: partProps === ROLE ? (updatedValue as string) : part.role,
    procent: partProps === PROCENT ? Number(updatedValue) : part.procent,
  };
  return updatePart;
}
