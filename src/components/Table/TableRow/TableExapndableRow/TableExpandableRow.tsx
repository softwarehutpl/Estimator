import { FC } from 'react';

import { Fields, Section, Task } from '../../../../types/Interface';
import { rowOrder } from '../../../../constants/constants';

import TableCell from '../../TableCell/TableCell';

import styles from './TableExpandableRow.module.scss';

interface IProps {
  data: Section;
  icon: string;
  onClick: () => void;
}

const TableExpandableRow: FC<IProps> = ({ data, icon, onClick }) => {
  //TODO move all logic to reducer

  const sumMinValue = (tasks: Task[]): number =>
    tasks.reduce((total, curr) => {
      if (curr.subtasks?.length) {
        total += curr.minMd || 0;
        return (total += sumMinValue(curr.subtasks));
      }

      return (total += curr.minMd || 0);
    }, 0);

  const sumMaxValue = (tasks: Task[]): number =>
    tasks.reduce((total, curr) => {
      if (curr.subtasks?.length) {
        total += curr.maxMd || 0;
        return (total += sumMaxValue(curr.subtasks));
      }
      return (total += curr.maxMd || 0);
    }, 0);

  const sumPredicatedValue = (tasks: Task[]): number =>
    tasks.reduce((total, curr) => {
      if (curr.subtasks?.length) {
        total += curr.predictedMd || 0;
        return (total += sumPredicatedValue(curr.subtasks));
      }

      return (total += curr.predictedMd || 0);
    }, 0);

  const calculateRisk = (maxValue: number, predictedValue: number): number => {
    const resultValue = ((maxValue - predictedValue) / (predictedValue || 1)) * 100;

    if (isNaN(resultValue)) return 0;

    return Number(resultValue.toFixed(2));
  };

  return (
    <div className={`${styles.tableRow} ${styles.expandableRow}`}>
      {rowOrder.map(({ role }) => (
        <TableCell key={role} role={role}>
          {role === Fields.NAME && data[role as keyof Section]}
          {role === Fields.ROLE && null}
          {role === Fields.MIN_MD && sumMinValue(data.tasks)}
          {role === Fields.MIN_MD && sumMaxValue(data.tasks)}
          {role === Fields.PREDICTED_MD && sumPredicatedValue(data.tasks)}
          {role === Fields.RISK &&
            `${calculateRisk(sumMaxValue(data.tasks), sumPredicatedValue(data.tasks))}%`}
        </TableCell>
      ))}
      <button onClick={onClick} className={styles.expanderBtn}>
        <span className={icon}></span>
      </button>
    </div>
  );
};

export default TableExpandableRow;
