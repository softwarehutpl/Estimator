import { Dispatch, FC, SetStateAction, useState, MouseEvent } from 'react';
import { useParams } from 'react-router';

import { Fields, Params, Task, Type } from '../../../../types/Interface';
import { rowOrder } from '../../../../constants/constants';

import ContextMenu from '../../../ContextMenu/ContextMenu';
import TableCell from '../../TableCell/TableCell';
import TaskComment from '../../TaskComment/TaskComment';
import TaskInputText from '../../../Input/TaskInputText/TaskInputText';
import TaskInputNumber from '../../../Input/TaskInputNumber/TaskInputNumber';
import RiskBadge from '../../RiskBadge/RiskBadge';

import styles from './TableDraggableRow.module.scss';

interface IProps {
  data: Task;

  openedMenuId: string | null;
  orderNumber: number;
  parentOrderNumber?: number;
  parentTaskId?: string;
  sectionName: string;
  setopenedMenuId: Dispatch<SetStateAction<string | null>>;
  stylingClass?: string;
}

const TableDraggableRow: FC<IProps> = ({
  data,
  openedMenuId,
  orderNumber,
  parentOrderNumber,
  parentTaskId,
  sectionName,
  setopenedMenuId,
  stylingClass,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { projectId } = useParams<Params>();

  const handleToggleComment = () => {
    setIsEditable(!isEditable);
  };

  const handleToggleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (e.type === 'mouseleave' && !isOpen) {
      return;
    }

    setIsOpen(!isOpen);
  };

  //TODO change this function name?
  const handleTooltipClosed = () => setopenedMenuId(null);

  return (
    <>
      <div
        className={`${styles.tableRow} ${stylingClass}`}
        onClick={handleTooltipClosed}
        onMouseLeave={(e) => handleToggleContextMenu(e)}
      >
        <ContextMenu
          data={data}
          handleToggleComment={handleToggleComment}
          handleToggleContextMenu={handleToggleContextMenu}
          isOpen={isOpen}
          parentTaskId={parentTaskId}
          projectId={projectId}
          sectionName={sectionName}
        />
        {rowOrder.map(({ role }) => {
          if (data.type === Type.Group) {
            return (
              <TableCell key={role} role={role}>
                {role === 'sectionId' && orderNumber}
                {role === 'name' && (
                  <TaskInputText sectionName={sectionName} taskId={data.id} value={data[role]} />
                )}
              </TableCell>
            );
          } else {
            if (role === Fields.NAME) {
              return (
                <TableCell key={role} role={role}>
                  {role === 'name' && (
                    <TaskInputText
                      sectionName={sectionName}
                      taskId={data.id}
                      parentTaskId={parentTaskId}
                      value={data[role]}
                    />
                  )}
                </TableCell>
              );
            } else if (role === Fields.MIN_MD || role === Fields.MAX_MD) {
              return (
                <TableCell key={role} role={role}>
                  <TaskInputNumber
                    parentTaskId={parentTaskId}
                    role={role}
                    sectionName={sectionName}
                    taskId={data.id}
                    value={data[role]}
                  />
                </TableCell>
              );
            } else if (role === Fields.RISK) {
              return (
                <TableCell key={role} role={role}>
                  <RiskBadge
                    openedMenuId={openedMenuId}
                    parentTaskId={parentTaskId}
                    risk={data[role]}
                    sectionName={sectionName}
                    setopenedMenuId={setopenedMenuId}
                    taskId={data.id}
                  />
                </TableCell>
              );
            } else if (role === Fields.SECTION_ID) {
              return (
                <TableCell key={role} role={role}>
                  {parentTaskId ? `${parentOrderNumber}.${orderNumber}` : orderNumber}
                </TableCell>
              );
            } else {
              return (
                <TableCell key={role} role={role}>
                  {role === 'sectionId' ? orderNumber : data[role as keyof Task]}
                </TableCell>
              );
            }
          }
        })}
        {data.type === 'task' && (
          <TaskComment
            comment={data.comment}
            isEditable={isEditable}
            parentTaskId={parentTaskId}
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
