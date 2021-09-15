import { FC } from 'react';

export const columns = [
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
			<tr
				style={{
					borderTop: '1px solid black',
					borderBottom: '1px solid black',
					backgroundColor: '#ddd',
				}}
			>
				{columns.map((col) => (
					<th
						key={col.name}
						// style={col.name ? { border: '1px solid black', padding: '10px' } : { padding: '10px' }}
					>
						{col.name}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
