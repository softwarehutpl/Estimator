import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { recalculatePerMember, updateProjectHeader } from '../../../store/reducers/projectReducer';
import { PressableKeys } from '../../../types/Interface';

import styles from './HeaderInputNumber.module.scss';

interface IProps {
  field: string;
  placeholder?: string;
  projectId: string;
  title: string;
  value: number;
}

const HeaderInputNumber: FC<IProps> = ({ field, placeholder, projectId, title, value }) => {
  const [inputValue, setInputValue] = useState<number>(value);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!inputValue || inputValue === value) return;

    if (field === 'teamSize') {
      dispatch(
        recalculatePerMember({
          projectId,
          updatedValue: {
            field,
            value: inputValue,
          },
        })
      );

      return;
    }

    dispatch(
      updateProjectHeader({
        projectId,
        updatedValue: {
          field,
          value: inputValue,
        },
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
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(Number(value));
  };

  return (
    <label className={styles.headerLabel}>
      {title}:
      <input
        ref={inputRef}
        type='number'
        min='0'
        step={field === 'teamSize' ? '1' : '0.5'}
        max='100'
        placeholder={placeholder || ''}
        value={inputValue}
        onBlur={handleSave}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e)}
        className={styles.headerInput}
      />
    </label>
  );
};

export default HeaderInputNumber;
