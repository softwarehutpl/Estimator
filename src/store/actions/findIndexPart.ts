import { Project } from "../../types/Interface";

export default function findIndexPart(project: Project, partName?: string) {
  const indexPart = project.rawDevelopmentEffortSum?.parts.findIndex(
    (part) => part.name === partName
  );
  return indexPart;
}
