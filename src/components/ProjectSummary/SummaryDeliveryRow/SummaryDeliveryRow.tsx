import { FC } from 'react';
import { Fields, Main } from '../../../types/Interface';
import SummaryTableInput from '../../Input/SummaryTableInput/SummaryTableInput';
import TableCell from '../../Table/TableCell/TableCell';

import styles from './SummaryDeliveryRow.module.scss';

interface IProps {
  dataRow: Main;
}

const SummaryDeliveryRow: FC<IProps> = ({ dataRow }) => {
  return (
    <div className={styles.tableRow}>
      <TableCell role={Fields.NAME}>{dataRow.name}</TableCell>
      <TableCell role={Fields.NAME}>
        <SummaryTableInput value={dataRow.estDeliveryDate || ''} />
      </TableCell>
    </div>
  );
};

export default SummaryDeliveryRow;
