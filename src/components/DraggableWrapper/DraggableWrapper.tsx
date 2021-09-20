import { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import styles from './DraggableWrapper.module.scss';

interface IProps {
	children: any;
	draggableId: string;
	index: number;
}

const DraggableWrapper: FC<IProps> = ({ children, draggableId, index }) => {
	return (
		<Draggable draggableId={draggableId} index={index}>
			{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
				return (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						className={`${
							snapshot.isDragging ? styles.draggableWrapperActive : styles.draggableWrapper
						} ${
							!snapshot.draggingOver && snapshot.isDragging
								? styles.draggableWrapperDisabled
								: styles.draggableWrapper
						}`}
					>
						{children}
						<div className={styles.draggableHandle} {...provided.dragHandleProps}>
							<i className='fas fa-grip-lines'></i>
						</div>
					</div>
				);
			}}
		</Draggable>
	);
};

export default DraggableWrapper;
