import { FC } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Panel } from 'primereact/panel';

import DroppableWrapper from '../DroppableWrapper/DroppableWrapper';
import TableRow from '../TableRow/TableRow';
import TableTasks from '../TableTasks/TableTasks';

import styles from './TableSection.module.scss';

interface IProps {
	//TODO why type Section is problematic?
	section: any;
}

const TableSection: FC<IProps> = ({ section }) => {
	console.log(section.tasks);

	const onDragEnd = (result: DropResult) => {
		//TODO implement reorder after drag
		console.log(result);
		return;
	};

	const sectionHeaderTemplate = (options: any) => {
		const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';

		return (
			<TableRow
				data={section}
				onClick={options.onTogglerClick}
				stylingClass={styles.expanderBtn}
				icon={toggleIcon}
				extendable
			/>
		);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Panel
				headerTemplate={sectionHeaderTemplate}
				toggleable
				collapsed
				className={styles.panelStyles}
			>
				{section.tasks.length ? (
					<DroppableWrapper droppableId={`droppable-${section.sectionId}`}>
						<TableTasks tasks={section.tasks} />
					</DroppableWrapper>
				) : (
					<p>No tasks yet...</p>
				)}
			</Panel>
		</DragDropContext>
	);
};

export default TableSection;
