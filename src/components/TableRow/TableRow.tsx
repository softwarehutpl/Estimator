import { FC } from 'react';

import { Section } from '../../types/Interface';

import TableCell from '../TableCell/TableCell';

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
		role: 'predicatedMD',
	},
	{
		name: 'Risk',
		role: 'risk',
	},
];

interface IProps {
	data?: any;
	isHeader?: boolean;
}

const TableRow: FC<IProps> = ({ data, isHeader }) => {
	const headerStyles = isHeader ? styles.tableHeader : '';

	return (
		<div className={`${styles.tableRow} ${headerStyles}`}>
			{rowOrder.map(({ name, role }) => (
				<TableCell key={role} grow={role === 'name'}>
					{data ? data[role as keyof Section] : name}
				</TableCell>
			))}
		</div>
	);
};

export default TableRow;
