import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import styles from './InputPanel.module.scss';

interface IProps {
	handleTaskAdd: () => void;
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
			<button onClick={handleTaskAdd} className={styles.panelButton}>
				Add
			</button>
		</div>
	);
};

export default InputPanel;
