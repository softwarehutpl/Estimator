import { FC, useState } from 'react';

import { projects } from '../../data.json';

import TableHeader from '../TableHeader/TableHeader';
import TableSection from '../TableSection/TableSection';

import styles from './EstimateTable.module.scss';

const EstimateTable: FC = () => {
	const [sections, setSections] = useState(projects[0].sections);

	return (
		<div className={styles.mainTable}>
			<TableHeader />
			{sections.map((section) => (
				<TableSection key={section.sectionId} section={section} />
			))}
		</div>
	);
};

export default EstimateTable;
