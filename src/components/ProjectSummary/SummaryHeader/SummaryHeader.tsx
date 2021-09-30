import classNames from 'classnames';
import { FC } from 'react';
import { summaryTableRowOrder } from '../../../constants/constants';
import TableCell from '../../Table/TableCell/TableCell';

import styles from './SummaryHeader.module.scss';

const SummaryHeader: FC = () => {
  const tableHeaderStyles = classNames(styles.tableRow, styles.header);

  return (
    <div className={tableHeaderStyles}>
      {summaryTableRowOrder.map(({ name, role }) => {
        return (
          <TableCell key={role} role={role}>
            {name}
          </TableCell>
        );
      })}
    </div>
  );
};

export default SummaryHeader;
