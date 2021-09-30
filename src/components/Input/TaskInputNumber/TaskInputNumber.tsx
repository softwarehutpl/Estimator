import { ChangeEvent, FC, KeyboardEvent, useState, useRef } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { recalculateAfterInputChange } from '../../../store/reducers/projectReducer';

import { Fields, Params, PressableKeys } from '../../../types/Interface';

import styles from './TaskInputNumber.module.scss';

interface IProps {
  maxMd: number;
  minMd: number;
  parentTaskId?: string;
  role: string;
  sectionName: string;
  taskId: string;
  value: number | null;
}

const TaskInputNumber: FC<IProps> = ({
  minMd,
  maxMd,
  parentTaskId,
  role,
  sectionName,
  taskId,
  value,
}) => {
  const [inputValue, setInputValue] = useState<number>(value || 0);

  const dispatch = useAppDispatch();

  const { projectId } = useParams<Params>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancelValue = () => setInputValue(value || 0);

  const handleUpdateValue = () => {
    if (inputValue === value) return;

    dispatch(
      recalculateAfterInputChange({
        projectId,
        sectionName,
        taskId: parentTaskId || taskId,
        subtaskId: (parentTaskId && taskId) || '',
        taskProps: role,
        updatedValue: inputValue,
      })
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (role === Fields.MIN_MD) {
      if (Number(value) >= maxMd) return;
    } else if (role === Fields.MAX_MD) {
      if (Number(value) < minMd) return;
    }

    if (Number(value) > 100 || Number(value) < 0) return;

    setInputValue(Number(value));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === PressableKeys.ENTER) {
      handleUpdateValue();
      inputRef.current!.blur();
    } else if (key === PressableKeys.ESCAPE) {
      handleCancelValue();
      inputRef.current!.blur();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type='number'
        ref={inputRef}
        min='0'
        max='100'
        step='0.25'
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={handleUpdateValue}
        onChange={(e) => handleInputChange(e)}
        value={inputValue}
        className={styles.taskNumberInput}
      />
    </div>
  );
};

export default TaskInputNumber;
