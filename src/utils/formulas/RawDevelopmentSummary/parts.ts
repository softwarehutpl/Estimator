import { RawDevelopmentEffortSum } from "../../../types/Interface";

//same calculation for min. max and predicted MD i RDS table
export const RDSparts = (data: RawDevelopmentEffortSum) => {
  const result = data.parts.map((part) => {
    return {
      maxMd: Math.round(part.procent * data.main.maxMd!),
      maxMdFormula: "",
      minMd: Math.round(part.procent * data.main.minMd!),
      minMdFormula: "",
      name: part.name,
      predictedMd: Math.round(part.procent * data.main.predictedMd!),
      predictedMdFormula: "",
      procent: 0,
      role: "QA",
    };
  });
  console.log(data);
  return result;
};
