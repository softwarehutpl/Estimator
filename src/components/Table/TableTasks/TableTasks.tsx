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
  const [openedMenuId, setopenedMenuId] = useState<string | null>(null);

  return (
    <>
      {tasks.map((task, index) => (
        <DraggableWrapper
          key={`draggable-${task.id}`}
          draggableId={`draggable-${task.id}`}
          index={index}
        >
          <TableDraggableRow
            data={task}
            index={index}
            orderNumber={index + 1}
            openedMenuId={openedMenuId}
            sectionName={sectionName}
            setopenedMenuId={setopenedMenuId}
            stylingClass={styles.task}
          />
          {Boolean(task.subtasks?.length) && (
            <TableSubtasks
              openedMenuId={openedMenuId}
              sectionName={sectionName}
              setopenedMenuId={setopenedMenuId}
              subtasks={task.subtasks || []}
              taskId={task.id}
            />
          )}
        </DraggableWrapper>
      ))}
    </>
  );
};

export default TableTasks;
