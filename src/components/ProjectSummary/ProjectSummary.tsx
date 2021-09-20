import { FC } from 'react';

import styles from './ProjectSummary.module.scss';

const ProjectSummary: FC = () => {
	return (
		<div className={styles.projectSummaryWrapper}>
			<div className={styles.projectSummaryContent}>Fixed Project Summary Table</div>
		</div>
	);
};

export default ProjectSummary;
