import { FC, useState } from 'react';

import { projects } from '../../data.json';
import { Section, Task } from '../../types/Interface';

import './EstimateTable.styles.css';
import TableHeader, { columns } from '../TableHeader/TableHeader';

// export to separate file
// const tableHeaders = [
// 	{ name: '', role: 'handler' },
// 	{ name: '', role: 'expander' },
// 	{ name: 'Id', role: 'section_id' },
// 	{
// 		name: 'Group/Task',
// 		role: 'name',
// 	},
// 	{
// 		name: 'Role',
// 		role: 'role',
// 	},
// 	{
// 		name: 'Min (MD)',
// 		role: 'minMd',
// 	},
// 	{
// 		name: 'Max (MD)',
// 		role: 'maxMd',
// 	},
// 	{
// 		name: 'Predicated (MD)',
// 		role: 'predicatedMD',
// 	},
// 	{
// 		name: 'Risk',
// 		role: 'risk',
// 	},
// ];

const EstimateTable: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleToggleGroup = () => setIsOpen(!isOpen);

	return (
		<table style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
			<TableHeader />
			<tbody>
				{/* add section component to separate component, move isOpen state to component */}
				{projects[0].sections.map((section) => {
					return (
						<tr>
							{columns.map(({ role }) => {
								if (role === 'handler') {
									return (
										<td style={{ padding: '10px' }}>
											<i className='fas fa-grip-horizontal'></i>
										</td>
									);
								}

								if (role === 'expander') {
									return (
										<td style={{ padding: '10px' }} onClick={handleToggleGroup}>
											{isOpen ? (
												<i className='fas fa-chevron-down'></i>
											) : (
												<i className='fas fa-chevron-right'></i>
											)}
										</td>
									);
								}
								return (
									<td style={{ border: '1px solid black', padding: '10px' }}>
										{section[role as keyof Section]}
									</td>
								);
							})}
						</tr>
					);
				})}
				{/* add as separate task component, change display place of this part to be below it's parent */}
				{isOpen && (
					<>
						{projects[0].sections[0].tasks.map((task) => {
							console.log(task);
							return (
								<tr>
									{columns.map(({ role }, i) => {
										if (role === 'handler') {
											return (
												<td style={{ padding: '10px' }}>
													<i className='fas fa-grip-horizontal'></i>
												</td>
											);
										}

										if (role === 'expander') {
											return <td style={{ padding: '10px' }}></td>;
										}

										if (role === 'section_id' && !task[role as keyof Task]) {
											return (
												<td
													style={{ border: '1px solid black', padding: '10px', textAlign: 'right' }}
												>
													{task['id']}
												</td>
											);
										}

										return (
											<td style={{ border: '1px solid black', padding: '10px' }}>
												{task[role as keyof Task]}
											</td>
										);
									})}
								</tr>
							);
						})}
					</>
				)}
			</tbody>
		</table>
	);
};

export default EstimateTable;
