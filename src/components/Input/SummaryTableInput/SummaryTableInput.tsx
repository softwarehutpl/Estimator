import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../../store/hooks';
import { updateDeliveryDate } from '../../../store/reducers/projectReducer';
import { Params, PressableKeys } from '../../../types/Interface';

import styles from './SummaryTableInput.module.scss';

interface IProps {
  value: string;
}

const SummaryTableInput: FC<IProps> = ({ value }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const dispatch = useAppDispatch();

  const { projectId } = useParams<Params>();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!inputValue || inputValue === value) return;

    dispatch(updateDeliveryDate({ newDate: inputValue, projectId }));
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
        type='date'
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

export default SummaryTableInput;
