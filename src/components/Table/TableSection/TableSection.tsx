import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Panel } from 'primereact/panel';

import DroppableWrapper from '../DroppableWrapper/DroppableWrapper';
import TableExpandableRow from '../TableRow/TableExapndableRow/TableExpandableRow';
import TableTasks from '../TableTasks/TableTasks';

import styles from './TableSection.module.scss';
import { useAppDispatch } from '../../../store/hooks';
import { addTask } from '../../../store/reducers/projectReducer';
import InputPanel from '../../Input/InputPanel/InputPanel';

interface IProps {
	//TODO why type Section is problematic?
	projectId: string;
	section: any;
	sections: any;
	setSections: Dispatch<SetStateAction<any>>;
}

const TableSection: FC<IProps> = ({ section, projectId, sections, setSections }) => {
	const [inputValue, setInputValue] = useState<string>('');
	const dispatch = useAppDispatch();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setInputValue(value);
	};

	const handleTaskAdd = () => {
		//TODO posibility to create task with diffrent type
		dispatch(addTask({ projectId, sectionName: section.name, taskName: inputValue, type: 'task' }));
	};

	const getNewSections = (tasks: any) => {
		const newSection = { ...section, tasks };

		return sections.map((item: any) => (item.sectionId === section.sectionId ? newSection : item));
	};

	const onDragEnd = (result: DropResult) => {
		//TODO add action to persist reorder changes in store
		const { destination, source } = result;

		const newSectionTasks = [...section.tasks];

		if (!destination || !source) return;

		if (source.index === destination.index && source.droppableId === destination.droppableId)
			return;

		if (source.droppableId === destination.droppableId) {
			const start = source.index;
			const end = destination.index;

			const [removedTask] = newSectionTasks.splice(start, 1);
			newSectionTasks.splice(end, 0, removedTask);

			setSections(getNewSections(newSectionTasks));
		} else {
			const start = source.index;
			const [removedTask] = newSectionTasks.splice(start, 1);
			const endTaksId = Number(destination.droppableId.split('droppable-')[1]);

			const abort = newSectionTasks.every((task) => task.id !== Number(endTaksId));

			if (abort) return;

			const result = newSectionTasks.map((task: any) =>
				task.id === endTaksId ? { ...task, subtasks: [...task.subtasks, removedTask] } : task
			);

			setSections(getNewSections(result));
		}

		return;
	};

	const sectionHeaderTemplate = (options: any) => {
		const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';

		return <TableExpandableRow data={section} onClick={options.onTogglerClick} icon={toggleIcon} />;
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
						<TableTasks tasks={section.tasks} sectionName={section.name} />
					</DroppableWrapper>
				) : (
					<InputPanel
						handleInputChange={handleInputChange}
						handleTaskAdd={handleTaskAdd}
						inputValue={inputValue}
					/>
				)}
			</Panel>
		</DragDropContext>
	);
};

export default TableSection;
