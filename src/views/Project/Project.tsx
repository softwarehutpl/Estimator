import React from 'react';
import EstimateTable from '../../components/EstimateTable/EstimateTable';
import styles from './project.module.scss';

interface Props {}

const DataView = (props: Props) => {
	return (
		<div className={styles.data}>
			<h1>Table Data component here</h1>
			<EstimateTable />
		</div>
	);
};

export default DataView;
