import { FC } from 'react';

import styles from './TableCell.module.scss';

interface IProps {
	grow?: boolean;
}

const TableCell: FC<IProps> = ({ children, grow }) => {
	const flfexGrowStyle = grow ? styles.flexGrowCell : '';
	return <div className={`${styles.tableCell} ${flfexGrowStyle}`}>{children}</div>;
};

export default TableCell;
