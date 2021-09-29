import { Fields, Task } from '../../types/Interface';

export default function updateTask(
  task: Task,
  taskProps: string,
  updatedValue: string | number | boolean
) {
  const updatedTask = {
    ...task,
    name: taskProps === Fields.NAME ? (updatedValue as string) : task.name,
    minMd: taskProps === Fields.MIN_MD ? Number(updatedValue) : task.minMd,
    maxMd: taskProps === Fields.MAX_MD ? Number(updatedValue) : task.maxMd,
    risk: taskProps === Fields.RISK ? (updatedValue as string) : task.risk,
    predictedMd: taskProps === Fields.PREDICTED_MD ? Number(updatedValue) : task.predictedMd,
    comment: {
      text: taskProps === Fields.COMMENT_TEXT ? (updatedValue as string) : task.comment.text,
      isImportant:
        taskProps === Fields.COMMENT_IMPORTANT
          ? (updatedValue as boolean)
          : task.comment.isImportant,
    },
  };
  return updatedTask;
}
