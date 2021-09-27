import { FC } from 'react';

import { rowOrder } from '../../../constants/constants';

import TableCell from '../TableCell/TableCell';

import styles from './TableHeader.module.scss';

const TableHeader: FC = () => {
  return (
    <div className={`${styles.tableRow} ${styles.header}`}>
      {rowOrder.map(({ name, role }) => (
        <TableCell key={role} role={role}>
          {name}
        </TableCell>
      ))}
    </div>
  );
};

export default TableHeader;
