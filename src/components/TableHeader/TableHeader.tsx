import { FC } from 'react';

export const headerRow = [
	{ name: '', role: 'handler' },
	{ name: '', role: 'expander' },
	{ name: 'Id', role: 'section_id' },
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

const TableHeader: FC = () => {
	return (
		<thead>
			{/* TODO add style to separate file */}
			<tr
				style={{
					borderTop: '1px solid black',
					borderBottom: '1px solid black',
					backgroundColor: '#ddd',
				}}
			>
				{headerRow.map((field) => (
					<th key={field.role}>{field.name}</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
