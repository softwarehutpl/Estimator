import initialProject from "../initials/initialProject";
import shortDate from "./shortDate";
import { v4 as uuidv4 } from "uuid";

export default function createNewProject(projectName: string) {
  const newProject = Object.assign({}, initialProject, {
    projectName: projectName,
    projectId: uuidv4(),
    estimationDate: shortDate(),
  });
  return newProject;
}
