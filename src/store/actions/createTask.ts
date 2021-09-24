import initialTask from "../initials/initialTask";
import { v4 as uuidv4 } from "uuid";
import { Type } from "../../types/Interface";

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
  sectionName: string,
  taskName: string = "",
  type?: string
) {
  const newTask = Object.assign({}, initialTask, {
    name: taskName,
    id: uuidv4(),
    role: returnRole(sectionName),
    type: type === "group" ? Type.Group : Type.Task,
    minMd: type === "group" ? null : 0,
    maxMd: type === "group" ? null : 0,
    predictedMd: type === "group" ? null : 0,
    risk: type === "group" ? "" : "L",
  });
  return newTask;
}
