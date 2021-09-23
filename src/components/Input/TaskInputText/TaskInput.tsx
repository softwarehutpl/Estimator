import { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { updateTasks } from '../../../store/reducers/projectReducer';

import styles from './TaskInput.module.scss';

interface IProps {
  sectionName: string;
  taskId: string;
  value: string;
}

const TaskInput: FC<IProps> = ({ sectionName, taskId, value }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { projectId } = useParams<{ projectId: string }>();

  const editableStyles = isActive ? styles.editableInputControlsActive : '';

  const handleOpenControlls = () => setIsActive(true);
  const handleCloseControlls = () => {
    setIsActive(false);
  };

  const handleSaveComment = () => {
    if (!inputValue || inputValue === value) return;

    dispatch(
      updateTasks({
        projectId,
        sectionName,
        taskId,
        taskProps: 'name',
        updatedValue: inputValue,
      })
    );
  };

  const handleCancelComment = () => {
    setInputValue(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type='text'
        value={inputValue || ''}
        onChange={(e) => handleInputChange(e)}
        onClick={handleOpenControlls}
        className={styles.taskTextInput}
      />
      <div
        className={`${styles.editableInputControls} ${editableStyles}`}
        onClick={handleCloseControlls}
      >
        <i
          onClick={handleSaveComment}
          className={`far fa-check-circle ${styles.inputCotrol} ${styles.inputCotrolApprove}`}
        ></i>
        <i
          onClick={handleCancelComment}
          className={`far fa-times-circle ${styles.inputCotrol} ${styles.inputCotrolCancel}`}
        ></i>
      </div>
    </div>
  );
};

export default TaskInput;
