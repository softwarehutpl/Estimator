import { FC } from 'react';
import {
	Droppable,
	DroppableProvided,
	DroppableStateSnapshot,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { Section } from '../../types/Interface';

import { headerRow } from '../TableHeader/TableHeader';

interface IProps {
	isExpanded: boolean;
	section: Section;
}

const TableTaskRow: FC<IProps> = ({ isExpanded, section }) => {
	return (
		<>
			{isExpanded && (
				<tr>
					<td colSpan={9}>
						<Droppable droppableId={`${section.sectionId}`}>
							{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
								return (
									<table
										ref={provided.innerRef}
										style={{
											backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
											borderCollapse: 'collapse',
											width: '500px',
										}}
									>
										<tbody>
											{section.tasks.map((task: any, index: number) => {
												return (
													<Draggable draggableId={`${task.id + 30}`} index={index}>
														{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
															// console.log(snapshot.isDragging);
															// console.log(snapshot);
															// console.log(provided.draggableProps.style);

															console.log(task.id);

															if (task.type === 'group') {
																return (
																	<tr
																		key={task.id}
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																	>
																		<td colSpan={9}>
																			<Droppable droppableId={`${task.id}`}>
																				{(
																					provided: DroppableProvided,
																					snapshot: DroppableStateSnapshot
																				) => {
																					console.log('Snapshot', snapshot);
																					return (
																						<table
																							ref={provided.innerRef}
																							{...provided.droppableProps}
																							style={{
																								backgroundColor: snapshot.isDraggingOver
																									? 'lightred'
																									: 'lightgrey',
																								borderCollapse: 'collapse',
																								width: '500px',
																							}}
																						>
																							{task.subtasks.map((subtask: any, index: number) => (
																								<Draggable
																									draggableId={`${(subtask.id + index) * 10}`}
																									index={(index + 1) * 10}
																								>
																									{(provided: DraggableProvided) => {
																										return (
																											<tr
																												ref={provided.innerRef}
																												{...provided.draggableProps}
																												{...provided.dragHandleProps}
																											>
																												<td>lol</td>
																												<td>lol</td>
																												<td>lol</td>
																												<td>lol</td>
																												<td>lol</td>
																												<td>lol</td>
																												<td>lol</td>
																											</tr>
																										);
																									}}
																								</Draggable>
																							))}
																							{provided.placeholder}
																						</table>
																					);
																				}}
																			</Droppable>
																		</td>
																	</tr>
																);
															}

															return (
																<tr
																	key={task.id}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	ref={provided.innerRef}
																	style={
																		snapshot.isDragging
																			? {
																					width: '500px',
																					backgroundColor: 'lightgreen',
																					...provided.draggableProps.style,
																			  }
																			: { width: '500px', ...provided.draggableProps.style }
																	}
																>
																	{headerRow.map(({ role }) => {
																		if (role === 'handler') {
																			return (
																				<td
																					// {...provided.dragHandleProps}
																					style={{ border: '1px solid black', padding: '10px' }}
																				>
																					<i className='fas fa-grip-horizontal'></i>
																				</td>
																			);
																		}

																		return (
																			<td
																				key={role}
																				style={{ border: '1px solid black', padding: '10px' }}
																			>
																				{role !== 'handler' && task[role]}
																			</td>
																		);
																	})}
																</tr>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}
										</tbody>
									</table>
								);
							}}
						</Droppable>
					</td>
				</tr>
			)}
		</>
	);
};

export default TableTaskRow;
