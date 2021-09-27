import { ChangeEvent, FC } from 'react';

import styles from './InputPanel.module.scss';

interface IProps {
  handleTaskAdd: (type: string) => void;
  inputValue: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputPanel: FC<IProps> = ({ handleTaskAdd, inputValue, handleInputChange }) => {
  return (
    <div className={styles.inputPanelWrapper}>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        placeholder='Add first task'
        className={styles.panelInput}
      />
      <button onClick={() => handleTaskAdd('task')} className={styles.panelButton}>
        Add
      </button>
      <button onClick={() => handleTaskAdd('group')} className={styles.panelButton}>
        Add Group
      </button>
    </div>
  );
};

export default InputPanel;
