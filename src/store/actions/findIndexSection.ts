import { Project } from "../../types/Interface";

export default function findIndexSection(
  project: Project,
  sectionName?: string
) {
  const indexSection = project.sections.findIndex(
    (section) => section.name === sectionName
  );
  return indexSection;
}
