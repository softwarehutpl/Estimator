import { FC, useState } from 'react';
import {
	DropResult,
	DragDropContext,
	DraggableProvided,
	Droppable,
	DroppableProvided,
	Draggable,
	DraggableStateSnapshot,
	DroppableStateSnapshot,
} from 'react-beautiful-dnd';

import { Section } from '../../types/Interface';

import { headerRow } from '../TableHeader/TableHeader';
import TableRowExpander from '../TableRowExpander/TableRowExpander';
import TableTaskRow from '../TableTaskRow/TableTaskRow';

interface IProps {
	//TODO why type Section is problematic?
	section: any;
}

const TableSectionRow: FC<IProps> = ({ section }) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const handleToggleExpand = () => setIsExpanded(!isExpanded);

	const onDragEnd = (result: DropResult) => {
		console.log(result);
		return;
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<tr>
				{headerRow.map(({ role }) => {
					if (role === 'expander') {
						return (
							<TableRowExpander
								key={role}
								handleToggleExpand={handleToggleExpand}
								isExpanded={isExpanded}
								role={role}
							/>
						);
					}
					return (
						<td key={role} style={{ border: '1px solid black', padding: '10px', fontWeight: 700 }}>
							{role !== 'handler' && section[role as keyof Section]}
						</td>
					);
				})}
			</tr>
			<TableTaskRow isExpanded={isExpanded} section={section} />
		</DragDropContext>
	);
};

export default TableSectionRow;
