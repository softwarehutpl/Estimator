import { FC } from 'react';

import { Comment } from '../../../types/Interface';

import TaskCommentInput from '../../Input/TaskCommentInput/TaskCommentInput';

import styles from './TaskComment.module.scss';

interface IProps {
  comment: Comment;
  isEditable: boolean;
  parentTaskId?: string;
  sectionName: string;
  taskId: string;
  toggleComment: () => void;
}

const TaskComment: FC<IProps> = ({
  comment,
  isEditable,
  parentTaskId,
  sectionName,
  taskId,
  toggleComment,
}) => {
  return (
    <>
      {(comment.text || isEditable) && (
        <div className={`${styles.taskComment}`}>
          <TaskCommentInput
            comment={comment}
            parentTaskId={parentTaskId}
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
