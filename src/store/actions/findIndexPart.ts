import { Part, Project, RawDevelopmentEffortSum } from "../../types/Interface";

export default function findIndexPart(
  rawDevelopmentEffortSum: RawDevelopmentEffortSum,
  partName?: string
) {
  const indexPart = rawDevelopmentEffortSum.parts.findIndex(
    (part) => part.name === partName
  );
  return indexPart || 0;
}
