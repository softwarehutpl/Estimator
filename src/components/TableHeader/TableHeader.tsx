import { FC } from 'react';

import TableRow from '../TableRow/TableRow';

import styles from './TableHeader.module.scss';

const TableHeader: FC = () => {
	return <TableRow stylingClass={styles.header} />;
};

export default TableHeader;
