import { FC } from 'react';
import { Task } from '../../../types/Interface';
import DraggableWrapper from '../DraggableWrapper/DraggableWrapper';
import DroppableWrapper from '../DroppableWrapper/DroppableWrapper';
import TableRow from '../TableRow/TableRow/TableRow';

interface IProps {
	subtasks: Task[];
	taskId: string;
}

const TableSubtasks: FC<IProps> = ({ subtasks, taskId }) => {
	return (
		<>
			<DroppableWrapper droppableId={`droppable-${taskId}`}>
				{subtasks.map((subtask, index) => (
					<TableRow key={subtask.id} data={subtask} />
					// <DraggableWrapper
					// 	key={`subtask-${subtask.id}`}
					// 	draggableId={`subtask-${subtask.id}`}
					// 	index={9 + index}
					// >
					// 	<TableRow data={subtask} draggable />
					// </DraggableWrapper>
				))}
			</DroppableWrapper>
		</>
	);
};

export default TableSubtasks;
