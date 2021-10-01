import { calculateRisk } from "../../recalculateRow";
//Types
import { Project, RawDevelopmentEffortSum } from "../../../types/Interface";

export const RDSmain = (value: Project) => {
  console.log(value);
  const reducer = (accumulator: number, curr: number) => accumulator + curr;
  const minMd = [...value.sections.map((section) => section.minMd)].reduce(
    reducer
  ); //[];
  const maxMd = [...value.sections.map((section) => section.maxMd)].reduce(
    reducer
  );
  const predictedMd = [
    ...value.sections.map((section) => section.predictedMd),
  ].reduce(reducer);
  console.log("data", value);
  console.log("minMd");
  console.log(minMd);

  const calculatedValue = {
    maxMd,
    maxMdFormula: "",
    minMd,
    minMdFormula: "",
    predictedMd,
    predictedMdFormula: "",
    risk: calculateRisk(maxMd, predictedMd),
    riskFormula: "",
  };
  console.log("Main");
  console.log(calculatedValue);

  return calculatedValue;
};
