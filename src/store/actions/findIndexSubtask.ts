import { Section } from "../../types/Interface";

export default function findIndexTask(section: Section, taskId?: string) {
  const indexTask = section.tasks.findIndex((task) => task.id === taskId);
  return indexTask;
}
