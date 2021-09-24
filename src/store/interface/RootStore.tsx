import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Project } from '../../types/Interface';

import { useAppSelector, useAppDispatch } from '../hooks';
import {
  clearProjects,
  addProject,
  delProject,
  addTask,
  delTask,
  addSubtask,
  updateTasks,
  delSubtask,
  updateSubtask,

} from '../reducers/projectReducer';
import { getProjectsDataSelector, getProjectSelector } from '../selectors/selectors';


export default function RootStore() {
  const [projectName, setProjectName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskId, setTaskId] = useState('');
  const [type, setType] = useState('group');
  const [taskProps, setTaskProps] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');
  const [projectId, setProjectId] = useState('');
  const [subtaskId, setSubtaskId] = useState('');
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();

  // const project = useAppSelector(
  //   getProjectSelector("798f3fb6-76c4-41d9-88e1-9ed46fda1d58")
  // ); //=> PUSH PROJECT ID!

  const projectsData = useAppSelector(getProjectsDataSelector());

  useEffect(() => {
    // console.log(project);
    // console.log(projectsData);
    console.log(projects);
  }, [projects]);

  return (
    <div
      style={{
        border: '2px solid black',
        padding: '20px',
        backgroundColor: '#E6E6E6',
      }}
    >
      <nav className='p-d-flex p-jc-around'>
        <Link to='/'>Home</Link>
        <Link to='/project'>Project</Link>
      </nav>
      <p>---------- CLEAR PROJECTS ----------</p>
      <button onClick={() => dispatch(clearProjects())}>clearProjects</button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>
        ---------- PROJECTS NAMES ----------
      </p>
      {projectsData.map((project: Project) => (
        <li
          key={project.projectId}
        >{`projectName ${project.projectName} id ${project.projectId}`}</li>
      ))}
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>
        --------- ADD NEW PROJECT -----------
      </p>
      <input
        type='text'
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        placeholder='Project Name'
      />
      <button
        onClick={() => {
          dispatch(
            addProject({
              projectName: projectName,
              projectId: uuidv4(),
            })
          );
          setProjectName('');
        }}
      >
        addProject
      </button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>--------- DEL PROJECT -----------</p>
      <input
        type='text'
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder='Project ID To Del'
      />
      <button
        onClick={() => {
          dispatch(delProject({ projectId: projectId }));
          setProjectId('');
        }}
      >
        delProject
      </button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>--------- ADD TASK -----------</p>
      Frontend development <br />
      <br />
      <input
        type='text'
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder='Project ID To Add Task'
      />
      <input
        type='text'
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder='Section Name To Add Task'
      />
      <input
        type='text'
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder='Task Name To Add Task'
      />
      <p>Task / Group</p>
      <input
        type='text'
        value={type}
        onChange={(event) => setType(event.target.value)}
        placeholder='Type Task / Group'
      />
      <button
        onClick={() => {
          dispatch(
            addTask({
              projectId: projectId,
              sectionName: sectionName,
              taskName: taskName,
              type: type,
            })
          );
          setSectionName('');
          setProjectId('');
          setTaskName('');
        }}
      >
        addTask
      </button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>--------- DEL TASK -----------</p>
      <input
        type='text'
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder='Project ID To Dell Task'
      />
      <input
        type='text'
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder='Section Name To Dell Task'
      />
      <input
        type='text'
        value={taskId}
        onChange={(event) => setTaskId(event.target.value)}
        placeholder='Task ID To Dell Task'
      />
      <button
        onClick={() => {
          dispatch(
            delTask({
              projectId: projectId,
              sectionName: sectionName,
              id: taskId,
            })
          );
          setSectionName('');
          setProjectId('');
          setTaskId('');
        }}
      >
        delTask
      </button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>--------- ADD SUBTASK -----------</p>
      Frontend development <br />
      <br />
      <input
        type='text'
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder='Project ID To Add Subtask'
      />
      <input
        type='text'
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder='Section Name To Add Subtask'
      />
      <input
        type='text'
        value={taskId}
        onChange={(event) => setTaskId(event.target.value)}
        placeholder='Task ID To Add Subtask'
      />
      <input
        type='text'
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder='Task Name To Add Subtask'
      />
      <button
        onClick={() => {
          dispatch(
            addSubtask({
              projectId: projectId,
              sectionName: sectionName,
              taskId: taskId,
              subtaskName: taskName,
            })
          );
          setSectionName('');
          setProjectId('');
          setTaskName('');
          setTaskId('');
        }}
      >
        addSubtask
      </button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>--------- DEL SUBTASK -----------</p>
      Frontend development <br />
      <br />
      <input
        type='text'
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder='Project ID To Add Subtask'
      />
      <input
        type='text'
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder='Section Name To Add Subtask'
      />
      <input
        type='text'
        value={taskId}
        onChange={(event) => setTaskId(event.target.value)}
        placeholder='Task ID To Add Subtask'
      />
      <input
        type='text'
        value={subtaskId}
        onChange={(event) => setSubtaskId(event.target.value)}
        placeholder='Subtask ID To Dell Subtask'
      />
      <button
        onClick={() => {
          dispatch(
            delSubtask({
              projectId: projectId,
              sectionName: sectionName,
              taskId: taskId,
              subtaskId: subtaskId,
            })
          );
          setSectionName('');
          setProjectId('');
          setTaskName('');
          setProjectId('');
        }}
      >
        delSubtask
      </button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>--------- UPDATE TASK -----------</p>
      Frontend development <br />
      <br />
      <input
        type='text'
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder='Project ID To Update Task'
      />
      <input
        type='text'
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder='Section Name To Update Task'
      />
      <input
        type='text'
        value={taskId}
        onChange={(event) => setTaskId(event.target.value)}
        placeholder='Task ID To Update Task'
      />
      <input
        type='text'
        value={taskProps}
        onChange={(event) => setTaskProps(event.target.value)}
        placeholder='Task Props To Update Task'
      />
      <input
        type='text'
        value={updatedValue}
        onChange={(event) => setUpdatedValue(event.target.value)}
        placeholder='Updated value'
      />
      <button
        onClick={() => {
          dispatch(
            updateTasks({
              projectId: projectId,
              sectionName: sectionName,
              taskId: taskId,
              taskProps: taskProps,
              updatedValue: updatedValue,
            })
          );
          setProjectId('');
          setSectionName('');
          setTaskId('');
          setTaskProps('');
          setUpdatedValue('');
        }}
      >
        updateTask
      </button>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>
        --------- UPDATE SUBTASK -----------
      </p>
      Frontend development <br />
      <br />
      <input
        type='text'
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder='Project ID To Update Subtask'
      />
      <input
        type='text'
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder='Section Name To Update Subtask'
      />
      <input
        type='text'
        value={taskId}
        onChange={(event) => setTaskId(event.target.value)}
        placeholder='Task ID To Update Subtask'
      />
      <input
        type='text'
        value={subtaskId}
        onChange={(event) => setSubtaskId(event.target.value)}
        placeholder='Subtask ID To Update Subtask'
      />
      <input
        type='text'
        value={taskProps}
        onChange={(event) => setTaskProps(event.target.value)}
        placeholder='Subtask Props To Update Subtask'
      />
      <input
        type='text'
        value={updatedValue}
        onChange={(event) => setUpdatedValue(event.target.value)}
        placeholder='Updated value'
      />
      <button
        onClick={() => {
          dispatch(
            updateSubtask({
              projectId: projectId,
              sectionName: sectionName,
              taskId: taskId,
              subtaskId: subtaskId,
              taskProps: taskProps,
              updatedValue: updatedValue,
            })
          );
          setProjectId('');
          setSectionName('');
          setTaskId('');
          setSubtaskId('');
          setTaskProps('');
          setUpdatedValue('');
        }}
      >
        updateSubtask
      </button>
    </div>
  );
}
