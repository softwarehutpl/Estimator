import { FC } from 'react';
import classNames from 'classnames';

import { rowOrder } from '../../../constants/constants';

import TableCell from '../TableCell/TableCell';

import styles from './TableHeader.module.scss';

const TableHeader: FC = () => {
  const tableHeaderStyles = classNames(styles.tableRow, styles.header);

  return (
    <div className={tableHeaderStyles}>
      {rowOrder.map(({ name, role }) => (
        <TableCell key={role} role={role}>
          {name}
        </TableCell>
      ))}
    </div>
  );
};

export default TableHeader;
