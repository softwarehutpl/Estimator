import { FC } from 'react';

import EstimateTable from '../../components/Table/EstimateTable/EstimateTable';
import ProjectSummary from '../../components/ProjectSummary/ProjectSummary';

import styles from './project.module.scss';

interface Props {}

const DataView: FC<Props> = () => {
	return (
		<main className={styles.contentWrapper}>
			<EstimateTable />
			<ProjectSummary />
		</main>
	);
};

export default DataView;
