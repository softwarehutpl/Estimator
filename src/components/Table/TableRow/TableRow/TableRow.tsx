import { FC } from 'react';

import { Section } from '../../../../types/Interface';

import TableCell from '../../TableCell/TableCell';

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
		name: 'Predicted (MD)',
		role: 'predictedMd',
	},
	{
		name: 'Risk',
		role: 'risk',
	},
];

interface IProps {
	data?: any;
	stylingClass?: string;
}

const TableRow: FC<IProps> = ({ data, stylingClass = '' }) => {
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
