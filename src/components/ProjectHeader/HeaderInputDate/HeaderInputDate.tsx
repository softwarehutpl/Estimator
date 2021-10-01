import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { recalculateTimeBudget, updateProjectHeader } from '../../../store/reducers/projectReducer';
import { PressableKeys } from '../../../types/Interface';
import { getDaysBetween } from '../../../utils/getDaysBetween';

import styles from './HeaderInputDate.module.scss';

interface IProps {
  field: string;
  projectId: string;
  title: string;
  value: string;
}

const HeaderInputDate: FC<IProps> = ({ field, projectId, title, value }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    setInputValue(value);
  };

  const handleSave = () => {
    if (!inputValue || inputValue === value) return;

    dispatch(
      recalculateTimeBudget({
        projectId,
        updatedValue: {
          field,
          value: inputValue,
        },
      })
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === PressableKeys.ENTER) {
      handleSave();
      inputRef.current!.blur();
    } else if (key === PressableKeys.ESCAPE) {
      handleCancel();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  return (
    <label className={styles.headerLabel}>
      {title}:
      <input
        ref={inputRef}
        type='date'
        value={inputValue}
        onBlur={handleSave}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e)}
        className={styles.headerInput}
      />
    </label>
  );
};

export default HeaderInputDate;
