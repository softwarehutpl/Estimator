import { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { updateTasks } from '../../../store/reducers/projectReducer';

import styles from './TaskInputNumber.module.scss';

interface IProps {
  role: string;
  sectionName: string;
  taskId: string;
  value: number | null;
}

const TaskInputNumber: FC<IProps> = ({ role, sectionName, taskId, value }) => {
  const [inputValue, setInputValue] = useState<number>(value || 0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { projectId } = useParams<{ projectId: string }>();

  const activeStyles = isActive ? styles.numberInputControlsActive : '';

  const handleCloseControls = () => setIsActive(false);
  const handleOpenControls = () => setIsActive(true);

  const handleCancelValue = () => {
    setInputValue(value || 0);
    handleCloseControls();
  };

  const handleUpdateValue = () => {
    console.log(inputValue);
    if (inputValue === value) {
      handleCloseControls();
      return;
    }

    dispatch(
      updateTasks({
        projectId,
        sectionName,
        taskId,
        taskProps: role,
        updatedValue: String(inputValue),
      })
    );

    handleCloseControls();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (Number(value) > 100 || Number(value) < 0) {
      return;
    }

    setInputValue(Number(value));
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={`${styles.numberInputControls} ${activeStyles}`}>
        <i
          onClick={handleUpdateValue}
          className={`far fa-check-circle ${styles.inputCotrol} ${styles.inputCotrolApprove}`}
        ></i>
        <i
          onClick={handleCancelValue}
          className={`far fa-times-circle ${styles.inputCotrol} ${styles.inputCotrolCancel}`}
        ></i>
      </div>
      <input
        type='number'
        min='0'
        max='100'
        step='0.25'
        placeholder='0'
        onChange={(e) => handleInputChange(e)}
        value={inputValue}
        onClick={handleOpenControls}
        className={styles.taskNumberInput}
      />
    </div>
  );
};

export default TaskInputNumber;
