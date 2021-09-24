import { Dispatch, FC, SetStateAction, useState, MouseEvent } from 'react';
import { useParams } from 'react-router';

import { rowOrder } from '../TableRow/TableRow';

import { Task, Type } from '../../../../types/Interface';

import ContextMenu from '../../../ContextMenu/ContextMenu';
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

  const { projectId } = useParams<{ projectId: string }>();

  const handleToggleComment = () => {
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
        <ContextMenu
          endIndex={index}
          handleToggleComment={handleToggleComment}
          handleToggleContextMenu={handleToggleContextMenu}
          isOpen={isOpen}
          projectId={projectId}
          sectionName={sectionName}
          taskComment={data.comment.text}
          taskId={data.id}
          type={data.type}
        />
        {rowOrder.map(({ role }) => {
          if (data.type === Type.Group) {
            return (
              <TableCell key={role} role={role}>
                {role === 'sectionId' && orderNumber}
                {role === 'name' && (
                  <TaskInput sectionName={sectionName} taskId={data.id} value={data[role]} />
                )}
              </TableCell>
            );
          }

          if (role === 'risk') {
            return (
              <TableCell key={role} role={role}>
                <RiskBadge
                  openTooltipId={openTooltipId}
                  orderNumber={orderNumber}
                  risk={data[role]}
                  sectionName={sectionName}
                  setOpenTooltipId={setOpenTooltipId}
                  taskId={data.id}
                />
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
        {data.type === 'task' && (
          <TaskComment
            comment={data.comment}
            isEditable={isEditable}
            sectionName={sectionName}
            taskId={data.id}
            toggleComment={handleToggleComment}
          />
        )}
      </div>
    </>
  );
};

export default TableDraggableRow;
