import initialProject from "../initials/initialProject";
import shortDate from "./shortDate";
// import { v4 as uuidv4 } from "uuid";

export default function createProject(projectName: string, projectId: string) {
  const newProject = Object.assign(
    {},
    JSON.parse(JSON.stringify(initialProject)),
    {
      projectName: projectName,
      // projectId: uuidv4(),
      projectId: projectId,
      estimationDate: shortDate(),
    }
  );

  return JSON.parse(JSON.stringify(newProject));
}
