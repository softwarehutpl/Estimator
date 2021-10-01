import { Task } from "../types/Interface";

export const calculateRisk = (
  maxValue: number,
  predictedValue: number
): number => {
  const resultValue =
    ((maxValue - predictedValue) / (predictedValue || 1)) * 100;

  if (isNaN(resultValue)) return 0;

  return Number(resultValue.toFixed(2));
};

const sumMinValue = (tasks: Task[]): number =>
  Number(
    tasks
      .reduce((total, curr) => {
        if (curr.subtasks?.length) {
          total += curr.minMd || 0;
          return (total += sumMinValue(curr.subtasks));
        }

        return (total += curr.minMd || 0);
      }, 0)
      .toFixed(2)
  );

const sumMaxValue = (tasks: Task[]): number =>
  Number(
    tasks
      .reduce((total, curr) => {
        if (curr.subtasks?.length) {
          total += curr.maxMd || 0;
          return (total += sumMaxValue(curr.subtasks));
        }
        return (total += curr.maxMd || 0);
      }, 0)
      .toFixed(2)
  );

const sumPredicatedValue = (tasks: Task[]): number =>
  Number(
    tasks
      .reduce((total, curr) => {
        if (curr.subtasks?.length) {
          total += curr.predictedMd || 0;
          return (total += sumPredicatedValue(curr.subtasks));
        }

        return (total += curr.predictedMd || 0);
      }, 0)
      .toFixed(2)
  );

export const recalculateRow = (
  tasks: Task[]
): { predictedMd: number; minMd: number; maxMd: number; risk: number } => {
  const predictedMd = sumPredicatedValue(tasks);
  const minMd = sumMinValue(tasks);
  const maxMd = sumMaxValue(tasks);
  const risk = calculateRisk(maxMd, predictedMd);

  return { predictedMd, minMd, maxMd, risk };
};
