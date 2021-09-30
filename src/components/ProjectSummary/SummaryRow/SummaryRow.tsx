import { FC } from 'react';
import { summaryTableRowOrder } from '../../../constants/constants';
import { Main } from '../../../types/Interface';
import TableCell from '../../Table/TableCell/TableCell';

import styles from './SummaryRow.module.scss';

interface IProps {
  rowData: Main;
}

const SummaryRow: FC<IProps> = ({ rowData }) => {
  console.log(rowData);
  return (
    <div className={styles.tableRow}>
      {summaryTableRowOrder.map(({ role }) => {
        return (
          <TableCell key={role} role={role}>
            {rowData[role as keyof Main]}
          </TableCell>
        );
      })}
    </div>
  );
};

export default SummaryRow;
