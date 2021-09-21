import { FC, useState } from 'react';

import { Task } from '../../../types/Interface';

import DraggableWrapper from '../DraggableWrapper/DraggableWrapper';
import TableDraggableRow from '../TableRow/TableDraggableRow/TableDraggableRow';
import TableSubtasks from '../TableSubtasks/TableSubtasks';

import styles from './TableTask.module.scss';

interface IProps {
	tasks: Task[];
}

const TableTasks: FC<IProps> = ({ tasks }) => {
	const [openTooltipId, setOpenTooltipId] = useState<number | null>(null);

	return (
		<>
			{tasks.map((task, index) => {
				if (task.subtasks?.length) {
					return (
						<DraggableWrapper
							key={`draggable-${task.id}`}
							draggableId={`draggable-${task.id}`}
							index={index}
						>
							<TableDraggableRow
								data={task}
								orderNumber={index + 1}
								stylingClass={styles.task}
								openTooltipId={openTooltipId}
								setOpenTooltipId={setOpenTooltipId}
							/>
							<TableSubtasks subtasks={task.subtasks} taskId={task.id} />
						</DraggableWrapper>
					);
				}

				return (
					<DraggableWrapper
						key={`draggable-${task.id}`}
						draggableId={`draggable-${task.id}`}
						index={index}
					>
						<TableDraggableRow
							data={task}
							orderNumber={index + 1}
							stylingClass={styles.task}
							openTooltipId={openTooltipId}
							setOpenTooltipId={setOpenTooltipId}
						/>
					</DraggableWrapper>
				);
			})}
		</>
	);
};

export default TableTasks;
