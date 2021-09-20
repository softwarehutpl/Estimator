import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import styles from './EditableInput.module.scss';

interface IProps {
	value: string;
	setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditableInput: FC<IProps> = ({ setIsEditable, value }) => {
	const [inputValue, setInputValue] = useState<string>(value);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!inputRef.current) return;

		inputRef.current.focus();
	}, []);

	const handleInputSave = () => {
		//TODO: save value to store when approved by user
		setIsEditable(false);
	};

	const handleInputCancel = () => {
		//TODO: cancel what user typed
		setIsEditable(false);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const { value } = e.target;

		setInputValue(value);
	};

	return (
		<div className={styles.editableInputWrapper}>
			<input
				ref={inputRef}
				type='text'
				value={inputValue}
				onBlur={handleInputSave}
				onChange={handleInputChange}
				className={styles.editableInput}
			></input>
			<div className={styles.editableInputControls}>
				<i
					onClick={handleInputSave}
					className={`far fa-check-circle ${styles.inputCotrolApprove}`}
				></i>
				<i
					onClick={handleInputCancel}
					className={`far fa-times-circle ${styles.inputCotrolCancel}`}
				></i>
			</div>
		</div>
	);
};

export default EditableInput;
