import initialProject from "../initials/initialProject";
import shortDate from "./shortDate";

export default function createNewProject(projectName: any, estimatedBy: any) {
  const newProject = Object.assign({}, initialProject, {
    projectName: projectName,
    estimatedBy: estimatedBy,
    estimationDate: shortDate(),
  });
  return newProject;
}
