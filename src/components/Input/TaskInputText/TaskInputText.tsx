import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { updateSubtask, updateTasks } from '../../../store/reducers/projectReducer';

import { Fields, Params, PressableKeys } from '../../../types/Interface';

import styles from './TaskInputText.module.scss';

interface IProps {
  sectionName: string;
  parentTaskId?: string;
  taskId: string;
  value: string;
}

const TaskInputText: FC<IProps> = ({ sectionName, parentTaskId, taskId, value }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const dispatch = useAppDispatch();

  const { projectId } = useParams<Params>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!inputValue || inputValue === value) return;

    if (!parentTaskId) {
      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.NAME,
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
        taskProps: Fields.NAME,
        updatedValue: inputValue,
      })
    );
  };

  const handleCancel = () => {
    setInputValue(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === PressableKeys.ENTER) {
      handleSave();
      inputRef.current!.blur();
    } else if (key === PressableKeys.ESCAPE) {
      handleCancel();
      inputRef.current!.blur();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type='text'
        placeholder='Add your task name'
        ref={inputRef}
        value={inputValue || ''}
        onChange={(e) => handleInputChange(e)}
        className={styles.taskTextInput}
        onBlur={handleSave}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  );
};

export default TaskInputText;
