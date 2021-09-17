import { FC, useState } from 'react';

import { projects } from '../../data.json';
import { Project, Section, Task } from '../../types/Interface';

import './EstimateTable.styles.css';
import TableHeader, { headerRow } from '../TableHeader/TableHeader';
import TableSectionRow from '../TableSectionRow/TableSectionRow';

const EstimateTable: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [sections, setSections] = useState(projects[0].sections);

	const handleToggleGroup = () => setIsOpen(!isOpen);

	return (
		<table style={{ borderCollapse: 'collapse', margin: '0 auto', width: '70vw' }}>
			<TableHeader />
			<tbody>
				{sections.map((section) => (
					<TableSectionRow key={section.sectionId} section={section} />
				))}
			</tbody>
		</table>
	);
};

export default EstimateTable;
