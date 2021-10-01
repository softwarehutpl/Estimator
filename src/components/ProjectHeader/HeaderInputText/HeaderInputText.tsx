import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { updateProjectHeader } from '../../../store/reducers/projectReducer';
import { PressableKeys } from '../../../types/Interface';

import styles from './HeaderInputText.module.scss';

interface IProps {
  field: string;
  placeholder?: string;
  projectId: string;
  title: string;
  value: string;
}

const HeaderInputText: FC<IProps> = ({ field, placeholder, projectId, title, value }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    setInputValue(value);
  };

  const handleSave = () => {
    if (!inputValue || inputValue === value) return;
    console.log('saving');

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
        className={styles.headerInput}
        type='text'
        placeholder={placeholder || ''}
        value={inputValue}
        onBlur={handleSave}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </label>
  );
};

export default HeaderInputText;
