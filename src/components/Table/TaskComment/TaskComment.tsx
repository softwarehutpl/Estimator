import { FC } from 'react';

import { Comment } from '../../../types/Interface';

import EditableInput from '../EditableInput/EditableInput';

import styles from './TaskComment.module.scss';

interface IProps {
  comment: Comment;
  isEditable: boolean;
  sectionName: string;
  taskId: string;
  toggleComment: () => void;
}

const TaskComment: FC<IProps> = ({ comment, isEditable, sectionName, taskId, toggleComment }) => {
  return (
    <>
      {(comment.text || isEditable) && (
        <div className={`${styles.taskComment}`}>
          <EditableInput
            comment={comment}
            sectionName={sectionName}
            taskId={taskId}
            toggleComment={toggleComment}
          />
        </div>
      )}
    </>
  );
};

export default TaskComment;
