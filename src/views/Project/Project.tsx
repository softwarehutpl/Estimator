import { FC } from 'react';
import EstimateTable from '../../components/EstimateTable/EstimateTable';

import styles from './project.module.scss';

interface Props {}

const DataView: FC<Props> = () => {
	return (
		<div className={styles.tableWrapper}>
			<EstimateTable />
		</div>
	);
};

export default DataView;
