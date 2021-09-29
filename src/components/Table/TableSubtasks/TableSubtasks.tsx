import { Dispatch, FC, SetStateAction } from 'react';

import { Task } from '../../../types/Interface';

import DraggableWrapper from '../DraggableWrapper/DraggableWrapper';
import DroppableWrapper from '../DroppableWrapper/DroppableWrapper';
import TableDraggableRow from '../TableRow/TableDraggableRow/TableDraggableRow';

interface IProps {
  openedMenuId: string | null;
  parentOrderNumber: number;
  setopenedMenuId: Dispatch<SetStateAction<string | null>>;
  subtasks: Task[];
  taskId: string;
  sectionName: string;
}

const TableSubtasks: FC<IProps> = ({
  openedMenuId,
  parentOrderNumber,
  setopenedMenuId,
  subtasks,
  taskId,
  sectionName,
}) => {
  return (
    <>
      <DroppableWrapper droppableId={`droppable-${taskId}`}>
        {subtasks.map((subtask, index) => (
          <TableDraggableRow
            data={subtask}
            key={subtask.id}
            openedMenuId={openedMenuId}
            orderNumber={index + 1}
            parentOrderNumber={parentOrderNumber}
            parentTaskId={taskId}
            sectionName={sectionName}
            setopenedMenuId={setopenedMenuId}
          />
          // TODO add draggabel

          // <DraggableWrapper
          //   key={`subtask-${subtask.id}`}
          //   draggableId={`subtask-${subtask.id}`}
          //   index={9 + index}
          // >
          //   <TableDraggableRow
          //     data={subtask}
          //     key={subtask.id}
          //     openedMenuId={openedMenuId}
          //     orderNumber={index + 1}
          //     parentOrderNumber={parentOrderNumber}
          //     parentTaskId={taskId}
          //     sectionName={sectionName}
          //     setopenedMenuId={setopenedMenuId}
          //   />
          // </DraggableWrapper>
        ))}
      </DroppableWrapper>
    </>
  );
};

export default TableSubtasks;
