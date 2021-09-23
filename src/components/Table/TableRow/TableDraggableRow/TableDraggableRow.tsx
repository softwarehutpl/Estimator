import { Dispatch, FC, SetStateAction, useState, MouseEvent } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../../store/hooks';
import { addTask, delTask, reorder } from '../../../../store/reducers/projectReducer';
import { rowOrder } from '../TableRow/TableRow';

import { Task } from '../../../../types/Interface';

import TableCell from '../../TableCell/TableCell';
import TaskComment from '../../TaskComment/TaskComment';
import TaskInput from '../../../Input/TaskInputText/TaskInput';
import TaskInputNumber from '../../../Input/TaskInputNumber/TaskInputNumber';
import RiskBadge from '../../RiskBadge/RiskBadge';

import styles from './TableDraggableRow.module.scss';

interface IProps {
  data: Task;
  index: number;
  openTooltipId: number | null;
  orderNumber: number;
  sectionName: string;
  stylingClass?: string;
  setOpenTooltipId: Dispatch<SetStateAction<number | null>>;
}

const TableDraggableRow: FC<IProps> = ({
  data,
  index,
  openTooltipId,
  orderNumber,
  sectionName,
  stylingClass,
  setOpenTooltipId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { projectId } = useParams<{ projectId: string }>();

  const disabledComment = data.comment.text ? styles.rowControllerTaskButtonDisabled : '';

  const handleTaskAdd = () => {
    dispatch(addTask({ projectId, sectionName, type: 'task' }));
    dispatch(reorder({ projectId, sectionName, endIndex: index }));
  };

  //TODO posibility to create task with diffrent type
  const handleTaskGroupAdd = () => {};

  const handleTaskDelete = () => {
    dispatch(delTask({ projectId, sectionName, id: data.id }));
  };

  const handleToggleComment = () => {
    //TODO do not run this function when comment exists
    setIsEditable(!isEditable);
  };

  const handleToggleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (e.type === 'mouseleave' && !isOpen) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const handleTooltipClosed = () => setOpenTooltipId(null);

  return (
    <>
      <div
        className={`${styles.tableRow} ${stylingClass}`}
        onClick={handleTooltipClosed}
        onMouseLeave={(e) => handleToggleContextMenu(e)}
      >
        <div className={styles.rowController} onClick={(e) => handleToggleContextMenu(e)}>
          <button className={styles.rowControllerButton}>+</button>
          {isOpen && (
            <div className={styles.rowControllerButtonsWrapper}>
              <div className={styles.rowControllerTaskButton} onClick={handleTaskDelete}>
                <i className='pi pi-trash'></i>
              </div>
              <div className={styles.rowControllerTaskButton} onClick={handleTaskAdd}>
                <i className='pi pi-calendar-plus'></i>
              </div>
              <div
                className={`${styles.rowControllerTaskButton} ${disabledComment}`}
                onClick={handleToggleComment}
              >
                <i className='pi pi-comment'></i>
              </div>
            </div>
          )}
        </div>
        {rowOrder.map(({ role }) => {
          if (role === 'risk') {
            return (
              <TableCell key={role} role={role}>
                {/* TODO add diffrent display for group task */}
                {data.type === 'group' ? null : (
                  <RiskBadge
                    openTooltipId={openTooltipId}
                    orderNumber={orderNumber}
                    risk={data[role]}
                    sectionName={sectionName}
                    setOpenTooltipId={setOpenTooltipId}
                    taskId={data.id}
                  />
                )}
              </TableCell>
            );
          } else if (role === 'name') {
            return (
              <TableCell key={role} role={role}>
                <TaskInput sectionName={sectionName} taskId={data.id} value={data[role]} />
              </TableCell>
            );
          } else if (role === 'minMd' || role === 'maxMd') {
            return (
              <TableCell key={role} role={role}>
                <TaskInputNumber
                  role={role}
                  sectionName={sectionName}
                  taskId={data.id}
                  value={data[role]}
                />
              </TableCell>
            );
          }
          return (
            <TableCell key={role} role={role}>
              {role === 'sectionId' ? orderNumber : data[role as keyof Task]}
            </TableCell>
          );
        })}
        <TaskComment
          comment={data.comment}
          isEditable={isEditable}
          sectionName={sectionName}
          taskId={data.id}
          toggleComment={handleToggleComment}
        />
      </div>
    </>
  );
};

export default TableDraggableRow;
