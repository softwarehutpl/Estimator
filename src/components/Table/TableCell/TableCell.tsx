import { FC } from 'react';
import classNames from 'classnames';

import styles from './TableCell.module.scss';
import { Fields } from '../../../types/Interface';

const smallCells = ['role', 'risk'];
const medciumCells = ['minMd', 'maxMd'];

interface IProps {
  role?: string;
}

const TableCell: FC<IProps> = ({ children, role = '' }) => {
  const cellStyles = classNames(styles.tableCell, {
    [styles.idCell]: role === Fields.SECTION_ID,
    [styles.taskCell]: role === Fields.NAME,
    [styles.smallCell]: smallCells.includes(role),
    [styles.mediumCell]: medciumCells.includes(role),
    [styles.largeCell]: role === Fields.PREDICTED_MD,
  });

  return <div className={cellStyles}>{children}</div>;
};

export default TableCell;
