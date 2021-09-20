import { FC } from 'react';

import styles from './TableCell.module.scss';

const smallCells = ['role', 'risk'];
const medciumCells = ['minMd', 'maxMd'];

interface IProps {
	role?: string;
}

const TableCell: FC<IProps> = ({ children, role = '' }) => {
	const idCellStyles = role === 'sectionId' ? styles.idCell : '';

	const taskCellStyles = role === 'name' ? styles.taskCell : '';

	const smallCellStyles = smallCells.includes(role) ? styles.smallCell : '';

	const mediumCellStyles = medciumCells.includes(role) ? styles.mediumCell : '';

	const largeCellStyles = role === 'predictedMd' ? styles.largeCell : '';

	return (
		<div
			className={`${styles.tableCell} ${taskCellStyles} ${idCellStyles} ${smallCellStyles} ${mediumCellStyles} ${largeCellStyles}`}
		>
			{children}
		</div>
	);
};

export default TableCell;
