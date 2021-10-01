import classNames from 'classnames';
import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { updateSubtask, updateTasks } from '../../../store/reducers/projectReducer';

import { Comment, Fields, Params, PressableKeys } from '../../../types/Interface';

import styles from './TaskCommentInput.module.scss';

interface IProps {
  comment: Comment;
  parentTaskId?: string;
  sectionName: string;
  taskId: string;
  toggleComment: () => void;
}

const TaskCommentInput: FC<IProps> = ({
  comment,
  parentTaskId,
  sectionName,
  taskId,
  toggleComment,
}) => {
  const { text, isImportant } = comment;

  const [inputValue, setInputValue] = useState<string>(text);
  const [previousKey, setPreviousKey] = useState<string>('');

  const dispatch = useAppDispatch();

  const { projectId } = useParams<Params>();

  const inputRef = useRef<HTMLInputElement>(null);

  const inputStyles = classNames(styles.taskCommentInput, {
    [styles.taskCommentInputImportant]: isImportant,
  });

  const handleSaveComment = () => {
    if (!inputValue) {
      toggleComment();
      return;
    } else if (inputValue === text) return;

    if (!parentTaskId) {
      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.COMMENT_TEXT,
          updatedValue: inputValue,
        })
      );

      return;
    }

    dispatch(
      updateSubtask({
        projectId,
        sectionName,
        taskId: parentTaskId,
        subtaskId: taskId,
        taskProps: Fields.COMMENT_TEXT,
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

    if (!parentTaskId) {
      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.COMMENT_IMPORTANT,
          updatedValue: importantComment,
        })
      );

      return;
    }

    dispatch(
      updateSubtask({
        projectId,
        sectionName,
        taskId: parentTaskId,
        subtaskId: taskId,
        taskProps: Fields.COMMENT_IMPORTANT,
        updatedValue: importantComment,
      })
    );
  };

  const handleCommentDelete = () => {
    setInputValue('');

    if (!parentTaskId) {
      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.COMMENT_TEXT,
          updatedValue: '',
        })
      );

      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.COMMENT_IMPORTANT,
          updatedValue: false,
        })
      );

      return;
    }

    dispatch(
      updateSubtask({
        projectId,
        sectionName,
        taskId: parentTaskId,
        subtaskId: taskId,
        taskProps: Fields.COMMENT_TEXT,
        updatedValue: '',
      })
    );

    dispatch(
      updateSubtask({
        projectId,
        sectionName,
        taskId: parentTaskId,
        subtaskId: taskId,
        taskProps: Fields.COMMENT_IMPORTANT,
        updatedValue: false,
      })
    );

    toggleComment();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    setPreviousKey(key);

    if (key === PressableKeys.ENTER) {
      handleSaveComment();
      inputRef.current!.blur();
    } else if (key === PressableKeys.ESCAPE) {
      handleCancelComment();
    } else if (key === PressableKeys.I && previousKey === PressableKeys.CONTROL) {
      handleToggleCommentImportant();
    } else if (key === PressableKeys.DELETE) {
      handleCommentDelete();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setInputValue(value);
  };

  return (
    <div className={styles.taskCommentInputWrapper}>
      <label className={styles.label}>
        Comment:
        <input
          type='text'
          value={inputValue}
          ref={inputRef}
          onChange={handleInputChange}
          placeholder='Add your comment'
          onBlur={handleSaveComment}
          onKeyDown={(e) => handleKeyDown(e)}
          className={inputStyles}
        ></input>
      </label>
    </div>
  );
};

export default TaskCommentInput;
