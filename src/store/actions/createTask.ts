import initialTask from "../initials/initialTask";
import { v4 as uuidv4 } from "uuid";

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

export default function createTask(sectionName: string, taskName: string) {
  const newTask = Object.assign({}, initialTask, {
    name: taskName,
    id: uuidv4(),
    role: returnRole(sectionName),
  });
  return newTask;
}
