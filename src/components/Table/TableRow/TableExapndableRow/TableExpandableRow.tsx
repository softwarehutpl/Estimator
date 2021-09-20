import { FC } from 'react';

import { rowOrder } from '../TableRow/TableRow';

import TableCell from '../../TableCell/TableCell';
import { Section } from '../../../../types/Interface';

import styles from './TableExpandableRow.module.scss';

interface IProps {
	data: Section;
	icon: string;
	onClick: () => void;
}

const TableExpandableRow: FC<IProps> = ({ data, icon, onClick }) => {
	//TODO add action for dynamic field value generation dependent on other fields:
	//-- min (all tasks and subtasks min value summed)
	//-- max (all tasks and subtasks max value summed)
	//-- predicted (all tasks and subtask predicted value summed)
	//-- value from pattern = ((max-pred)/pred)*100

	return (
		<div className={`${styles.tableRow} ${styles.expandableRow}`}>
			{rowOrder.map(({ role }) => (
				<TableCell key={role} role={role}>
					{data[role as keyof Section]}
				</TableCell>
			))}
			<button onClick={onClick} className={styles.expanderBtn}>
				<span className={icon}></span>
			</button>
		</div>
	);
};

export default TableExpandableRow;
