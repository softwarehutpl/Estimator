import { FC, useState } from 'react';

import { Task } from '../../../types/Interface';

import DraggableWrapper from '../DraggableWrapper/DraggableWrapper';
import TableDraggableRow from '../TableRow/TableDraggableRow/TableDraggableRow';
import TableSubtasks from '../TableSubtasks/TableSubtasks';

import styles from './TableTask.module.scss';

interface IProps {
  sectionName: string;
  tasks: Task[];
}

const TableTasks: FC<IProps> = ({ sectionName, tasks }) => {
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
                index={index}
                orderNumber={index + 1}
                openTooltipId={openTooltipId}
                sectionName={sectionName}
                setOpenTooltipId={setOpenTooltipId}
                stylingClass={styles.task}
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
              index={index}
              orderNumber={index + 1}
              stylingClass={styles.task}
              openTooltipId={openTooltipId}
              sectionName={sectionName}
              setOpenTooltipId={setOpenTooltipId}
            />
          </DraggableWrapper>
        );
      })}
    </>
  );
};

export default TableTasks;
