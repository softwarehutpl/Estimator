import { FC } from 'react';

import { Task } from '../../types/Interface';

import DraggableWrapper from '../DraggableWrapper/DraggableWrapper';
import TableRow from '../TableRow/TableRow';

import styles from './TableTask.module.scss';

interface IProps {
	tasks: Task[];
}

const TableTasks: FC<IProps> = ({ tasks }) => {
	return (
		<>
			{tasks.map((task, index) => {
				return (
					<DraggableWrapper key={task.id} draggableId={`draggable-${task.id}`} index={index}>
						<TableRow data={task} draggable id={`${index + 1}`} stylingClass={styles.task} />
					</DraggableWrapper>
				);
			})}
		</>
	);
};

export default TableTasks;
