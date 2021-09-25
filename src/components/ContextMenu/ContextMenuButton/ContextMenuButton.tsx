import { FC } from 'react';

import styles from './ContextMenuButton.module.scss';

interface IProps {
  handler: () => void;
  icon: string;
  isDisabled?: boolean;
  title: string;
}

const ContextMenuButton: FC<IProps> = ({ handler, icon, isDisabled, title }) => {
  return (
    <div className={styles.taskButtonWrapper}>
      <button className={styles.taskButton} onClick={() => handler()} disabled={isDisabled}>
        <i className={icon}></i>
      </button>
      <div className={styles.tooltip}>{title}</div>
    </div>
  );
};

export default ContextMenuButton;
