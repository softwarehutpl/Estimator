import { FC, useState } from 'react';

import EditableInput from '../EditableInput/EditableInput';

import styles from './TaskComment.module.scss';

interface IProps {
	text: string;
	isImportant: boolean;
}

const TaskComment: FC<IProps> = ({ isImportant, text }) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);

	const importantStyles = isImportant ? styles.taskCommentImportant : '';

	return (
		<>
			{text && (
				<div className={`${styles.taskComment} ${importantStyles}`}>
					<span className={styles.taskCommentTitle}>Comment: </span>
					{!isEditable ? (
						<p onClick={() => setIsEditable(true)} className={styles.taskCommentText}>
							{text}
						</p>
					) : (
						<EditableInput value={text} setIsEditable={setIsEditable} />
					)}
				</div>
			)}
		</>
	);
};

export default TaskComment;
