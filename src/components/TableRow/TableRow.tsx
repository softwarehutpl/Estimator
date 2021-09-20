import { FC } from 'react';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';

import { Section } from '../../types/Interface';

import TableCell from '../TableCell/TableCell';
import TaskComment from '../TaskComment/TaskComment';

import styles from './TableRow.module.scss';

export const rowOrder = [
	{ name: 'Id', role: 'sectionId' },
	{
		name: 'Group/Task',
		role: 'name',
	},
	{
		name: 'Role',
		role: 'role',
	},
	{
		name: 'Min (MD)',
		role: 'minMd',
	},
	{
		name: 'Max (MD)',
		role: 'maxMd',
	},
	{
		name: 'Predicated (MD)',
		role: 'predictedMd',
	},
	{
		name: 'Risk',
		role: 'risk',
	},
];

interface IProps {
	data?: any;
	draggable?: boolean;
	extendable?: boolean;
	icon?: string;
	id?: string;
	isHeader?: boolean;
	onClick?: () => void;
	snapshot?: DraggableStateSnapshot;
	stylingClass?: string;
}

const TableRow: FC<IProps> = ({
	data,
	id,
	draggable = false,
	icon,
	onClick,
	extendable = false,
	snapshot,
	stylingClass = '',
}) => {
	if (extendable) {
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
	}

	if (draggable) {
		return (
			<>
				<div className={`${styles.tableRow} ${stylingClass}`}>
					{rowOrder.map(({ role }) => (
						<TableCell key={role} role={role}>
							{role === 'sectionId' ? id : data[role as keyof Section]}
						</TableCell>
					))}
					<TaskComment text={data.comment.text} isImportant={data.comment.isImportant} />
				</div>
			</>
		);
	}

	return (
		<div className={`${styles.tableRow} ${stylingClass}`}>
			{rowOrder.map(({ name, role }) => (
				<TableCell key={role} role={role}>
					{data ? data[role as keyof Section] : name}
				</TableCell>
			))}
		</div>
	);
};

export default TableRow;
