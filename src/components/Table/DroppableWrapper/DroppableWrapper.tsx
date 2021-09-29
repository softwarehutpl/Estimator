import { FC } from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

import styles from './DroppableWrapper.module.scss';

interface IProps {
  droppableId: string;
}

const DroppableWrapper: FC<IProps> = ({ children, droppableId }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
        //TODO add classnames
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              snapshot.isDraggingOver ? styles.droppableWrapperActive : styles.droppableWrapper
            }
          >
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default DroppableWrapper;
