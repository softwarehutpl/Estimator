import { Task } from "../../types/Interface";

export const taskPropsContstants = {
  NAME: "name",
  MIN_MD: "minMd",
  MAX_MD: "maxMd",
  RISK: "risk",
  COMMENT_TEXT: "commentText",
  COMMENT_IMPORTANT: "commentImportant",
};

export default function updateTask(
  task: Task,
  taskProps: string,
  updatedValue: string
) {
  const { NAME, MIN_MD, MAX_MD, RISK, COMMENT_TEXT, COMMENT_IMPORTANT } =
    taskPropsContstants;
  const updatedTask = {
    ...task,
    name: taskProps === NAME ? updatedValue : task.name,
    minMd: taskProps === MIN_MD ? Number(updatedValue) : task.minMd,
    maxMd: taskProps === MAX_MD ? Number(updatedValue) : task.maxMd,
    risk: taskProps === RISK ? updatedValue : task.risk,
    comment: {
      text: taskProps === COMMENT_TEXT ? updatedValue : task.comment.text,
      isImportant:
        taskProps === COMMENT_IMPORTANT
          ? updatedValue === "true"
            ? true
            : updatedValue === "false"
            ? false
            : task.comment.isImportant
          : task.comment.isImportant,
    },
  };
  return updatedTask;
}
