import { FC, MouseEvent } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { addSubtask, addTask, recalculateAfterDelete } from '../../store/reducers/projectReducer';

import { Task, Type } from '../../types/Interface';

import ContextMenuButton from './ContextMenuButton/ContextMenuButton';

import styles from './ContextMenu.module.scss';

interface IProps {
  data: Task;
  handleToggleComment: () => void;
  handleToggleContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  setInIndex: number;
  isOpen: boolean;
  parentTaskId?: string;
  projectId: string;
  sectionName: string;
}

const ContextMenu: FC<IProps> = ({
  data,
  handleToggleComment,
  handleToggleContextMenu,
  setInIndex,
  isOpen,
  parentTaskId,
  projectId,
  sectionName,
}) => {
  const dispatch = useAppDispatch();

  const {
    type,
    comment: { text },
    id: taskId,
  } = data;

  const isSubtask = Boolean(parentTaskId);

  const isCommentButtonDisabled = Boolean(text) || type === Type.Group;
  const isSubtaskButtonDisabled = type === Type.Task && !isSubtask;
  const isTaskButtonDisabled = isSubtask;

  const handleTaskAdd = (type: string) => {
    dispatch(addTask({ projectId, sectionName, type, setInIndex }));
  };

  const handleSubtaskAdd = () => {
    dispatch(
      addSubtask({
        projectId,
        sectionName,
        taskId: parentTaskId || taskId,
        subtaskName: '',
        setInIndex,
      })
    );
  };

  const handleTaskDelete = () => {
    dispatch(
      recalculateAfterDelete({
        projectId,
        sectionName,
        taskId: parentTaskId || taskId,
        subtaskId: (parentTaskId && taskId) || '',
      })
    );
  };

  return (
    <div className={styles.rowController} onClick={(e) => handleToggleContextMenu(e)}>
      <button className={styles.rowControllerButton}>+</button>
      {isOpen && (
        <div className={styles.rowControllerButtonsWrapper}>
          <ContextMenuButton
            icon={'pi pi-calendar'}
            isDisabled={isTaskButtonDisabled}
            handler={() => handleTaskAdd(Type.Task)}
            title={'Add task'}
          />
          <ContextMenuButton
            icon={'pi pi-calendar-plus'}
            isDisabled={isTaskButtonDisabled}
            handler={() => handleTaskAdd(Type.Group)}
            title={'Add group task'}
          />
          <ContextMenuButton
            icon={'pi pi-book'}
            isDisabled={isSubtaskButtonDisabled}
            handler={() => handleSubtaskAdd()}
            title={'Add subtask'}
          />
          <ContextMenuButton
            icon={'pi pi-trash'}
            handler={() => handleTaskDelete()}
            title={'Delete'}
          />
          <ContextMenuButton
            icon={'pi pi-comment'}
            isDisabled={isCommentButtonDisabled}
            handler={() => handleToggleComment()}
            title={'Add comment'}
          />
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
