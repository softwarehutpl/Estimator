import { FC } from 'react';

import { Fields, Section } from '../../../../types/Interface';
import { rowOrder } from '../../../../constants/constants';

import TableCell from '../../TableCell/TableCell';

import styles from './TableExpandableRow.module.scss';

interface IProps {
  data: Section;
  icon: string;
  onClick: () => void;
}

const TableExpandableRow: FC<IProps> = ({ data, icon, onClick }) => {
  return (
    <div className={`${styles.tableRow} ${styles.expandableRow}`}>
      {rowOrder.map(({ role }) => (
        <TableCell key={role} role={role}>
          {data[role as keyof Section]}
          {role === Fields.RISK && '%'}
        </TableCell>
      ))}
      <button onClick={onClick} className={styles.expanderBtn}>
        <span className={icon}></span>
      </button>
    </div>
  );
};

export default TableExpandableRow;
