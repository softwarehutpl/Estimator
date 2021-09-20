import { Project } from "../../types/Interface";
import initialTask from "../initials/initialTask";
import { v4 as uuidv4 } from "uuid";

export default interface AddTaskInterface {
  projectName: string;
  sectionName: string;
  taskName: string;
}

const returnRole = (sectionName: string) => {
  switch (sectionName) {
    case "Frontend development":
      return "FD";
    case "Backend development":
      return "BD";
    case "Mobile development":
      return "MD";
    case "Design / UX / UI":
      return "UD";
    case "Configuration / Setup / Deployment":
      return "DO";
    default:
      return "";
  }
};

export default function createTask(
  projects: Project[],
  projectName: string,
  sectionName: string,
  taskName: string
) {
  const newTask = Object.assign({}, initialTask, {
    name: taskName,
    id: uuidv4(),
    role: returnRole(sectionName),
  });
  const createTask: Project[] = [...projects].map((project) =>
    project.projectName === projectName
      ? {
          ...project,
          sections: project.sections
            ? [...project.sections].map((section) =>
                section.name === sectionName
                  ? { ...section, tasks: section.tasks.concat(newTask) }
                  : section
              )
            : [],
        }
      : project
  );
  return createTask;
}
