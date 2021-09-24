import { ChangeEvent, FC, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addTask, delTask, reorder } from '../../../store/reducers/projectReducer';
import { getProjectSelector } from '../../../store/selectors/selectors';

import { Section, Task } from '../../../types/Interface';

import DroppableWrapper from '../DroppableWrapper/DroppableWrapper';
import InputPanel from '../../Input/InputPanel/InputPanel';
import TableExpandableRow from '../TableRow/TableExapndableRow/TableExpandableRow';
import TableTasks from '../TableTasks/TableTasks';

import { Panel } from 'primereact/panel';
import styles from './TableSection.module.scss';
interface IProps {
  projectId: string;
  section: Section;
}

const TableSection: FC<IProps> = ({ projectId, section }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const project = useAppSelector(getProjectSelector(projectId));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const handleTaskAdd = (type: string) => {
    dispatch(addTask({ projectId, sectionName: section.name, taskName: inputValue, type }));
  };

  // const getNewSections = (tasks: any) => {
  //   const newSection = { ...section, tasks };

  //   return sections.map((item: any) => (item.sectionId === section.sectionId ? newSection : item));
  // };

  const onDragEnd = (result: DropResult) => {
    //TODO add action to persist reorder changes in store
    const { destination, source } = result;

    // const newSectionTasks = [...section.tasks];

    if (!destination || !source) return;

    if (source.index === destination.index && source.droppableId === destination.droppableId)
      return;

    if (source.droppableId === destination.droppableId) {
      const start = source.index;
      const end = destination.index;

      console.log('Start', start);
      console.log('End', end);

      const task: Task = project.sections.find(
        (item: Section) => item.sectionId === section.sectionId
      ).tasks[start];

      console.log(task);

      dispatch(delTask({ projectId, sectionName: section.name, id: task.id }));
      dispatch(addTask);

      // const [removedTask] = tasks?.splice(start, 1);

      // console.log(removedTask);

      // console.log(tasks);
      // dispatch(reorder({ projectId, sectionName: section.name, startIndex: start, endIndex: end }));

      // const [removedTask] = newSectionTasks.splice(start, 1);
      // newSectionTasks.splice(end, 0, removedTask);

      // setSections(getNewSections(newSectionTasks));
    } else {
      // const start = source.index;
      // const [removedTask] = newSectionTasks.splice(start, 1);
      // const endTaksId = Number(destination.droppableId.split('droppable-')[1]);

      // const abort = newSectionTasks.every((task) => task.id !== Number(endTaksId));

      // if (abort) return;

      // const result = newSectionTasks.map((task: any) =>
      //   task.id === endTaksId ? { ...task, subtasks: [...task.subtasks, removedTask] } : task
      // );
      return;

      // setSections(getNewSections(result));
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
