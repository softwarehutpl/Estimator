import { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { updateTasks } from '../../../store/reducers/projectReducer';

import { Comment } from '../../../types/Interface';

import styles from './EditableInput.module.scss';

interface IProps {
  comment: Comment;
  sectionName: string;
  taskId: string;
  toggleComment: () => void;
}

const EditableInput: FC<IProps> = ({ comment, sectionName, taskId, toggleComment }) => {
  const { text, isImportant } = comment;

  const [inputValue, setInputValue] = useState<string>(text);
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { projectId } = useParams<{ projectId: string }>();

  const importantStyles = isImportant ? styles.editableInputImportant : '';
  const editableStyles = isActive ? styles.editableInputControlsActive : '';

  const handleOpenControlls = () => setIsActive(true);
  const handleCloseControlls = () => setIsActive(false);

  const handleSaveComment = () => {
    if (!inputValue) {
      toggleComment();
      return;
    } else if (inputValue === text) return;

    dispatch(
      updateTasks({
        projectId,
        sectionName,
        taskId,
        taskProps: 'commentText',
        updatedValue: inputValue,
      })
    );
  };

  const handleCancelComment = () => {
    setInputValue(text);

    if (!text) toggleComment();
  };

  const handleToggleCommentImportant = () => {
    if (!inputValue) {
      toggleComment();
      return;
    }

    const importantComment = !isImportant;

    dispatch(
      updateTasks({
        projectId,
        sectionName,
        taskId,
        taskProps: 'commentImportant',
        updatedValue: String(importantComment),
      })
    );
  };

  const handleCommentDelete = () => {
    setInputValue('');

    dispatch(
      updateTasks({
        projectId,
        sectionName,
        taskId,
        taskProps: 'commentText',
        updatedValue: '',
      })
    );

    dispatch(
      updateTasks({
        projectId,
        sectionName,
        taskId,
        taskProps: 'commentImportant',
        updatedValue: String(false),
      })
    );

    toggleComment();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setInputValue(value);
  };

  return (
    <div className={styles.editableInputWrapper}>
      <label className={styles.label} tabIndex={1} onClick={handleOpenControlls}>
        Comment:
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Add your comment'
          className={`${styles.editableInput} ${importantStyles}`}
        ></input>
      </label>
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
        <i
          onClick={handleToggleCommentImportant}
          className={`pi pi-info ${styles.inputCotrol} ${styles.inputCotrolImportant}`}
        ></i>
        <i
          onClick={handleCommentDelete}
          className={`pi pi-trash ${styles.inputCotrol} ${styles.inputCotrolDelete}`}
        ></i>
      </div>
    </div>
  );
};

export default EditableInput;
