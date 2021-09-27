import { Projects } from "../../types/Interface";

export default function findIndexProject(state: Projects, projectId?: string) {
  const indexProject = state.projects.findIndex(
    (project) => project.projectId === projectId
  );
  return indexProject;
}
