import { FC, MouseEvent } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { addTask, delTask, reorder } from '../../store/reducers/projectReducer';

import { Type } from '../../types/Interface';

import styles from './ContextMenu.module.scss';

interface IProps {
  endIndex: number;
  handleToggleComment: () => void;
  handleToggleContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
  isOpen: boolean;
  projectId: string;
  sectionName: string;
  taskComment: string;
  taskId: string;
  type: string;
}

const ContextMenu: FC<IProps> = ({
  endIndex,
  handleToggleComment,
  handleToggleContextMenu,
  isOpen,
  projectId,
  sectionName,
  taskComment,
  taskId,
  type,
}) => {
  const dispatch = useAppDispatch();

  const isCommentButtonDisabled = Boolean(taskComment) || type === Type.Group;
  const isSubtaskButtonDisabled = type === Type.Task;

  const handleTaskAdd = (type: string) => {
    dispatch(addTask({ projectId, sectionName, type }));
    dispatch(reorder({ projectId, sectionName, endIndex }));
  };

  const handleSubtaskAdd = () => {
    console.log('adding subtask');
  };

  const handleTaskDelete = () => {
    dispatch(delTask({ projectId, sectionName, id: taskId }));
  };

  return (
    <div className={styles.rowController} onClick={(e) => handleToggleContextMenu(e)}>
      <button className={styles.rowControllerButton}>+</button>
      {isOpen && (
        <div className={styles.rowControllerButtonsWrapper}>
          <div className={styles.taskButtonWrapper}>
            <button
              className={styles.rowControllerTaskButton}
              onClick={() => handleTaskAdd(Type.Task)}
            >
              <i className='pi pi-calendar'></i>
            </button>
            <div className={styles.tooltip}>Add task</div>
          </div>
          <div className={styles.taskButtonWrapper}>
            <button
              className={styles.rowControllerTaskButton}
              onClick={() => handleTaskAdd(Type.Group)}
            >
              <i className='pi pi-calendar-plus'></i>
            </button>
            <div className={styles.tooltip}>Add group task</div>
          </div>
          <div className={styles.taskButtonWrapper}>
            <button
              className={styles.rowControllerTaskButton}
              onClick={handleSubtaskAdd}
              disabled={isSubtaskButtonDisabled}
            >
              <i className='pi pi-book'></i>
            </button>
            <div className={styles.tooltip}>Add subtask</div>
          </div>
          <div className={styles.taskButtonWrapper}>
            <button className={styles.rowControllerTaskButton} onClick={handleTaskDelete}>
              <i className='pi pi-trash'></i>
            </button>
            <div className={styles.tooltip}>Delete</div>
          </div>
          <div className={styles.taskButtonWrapper}>
            <button
              className={`${styles.rowControllerTaskButton}`}
              onClick={handleToggleComment}
              disabled={isCommentButtonDisabled}
            >
              <i className='pi pi-comment'></i>
            </button>
            <div className={styles.tooltip}>Add comment</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
