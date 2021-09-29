<<<<<<< HEAD
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initials/initialState";
import createProject from "../actions/createProject";
import createTask from "../actions/createTask";
import TableTasks from "../../components/Table/TableTasks/TableTasks";
import findIndexProject from "../actions/findIndexProject";
import findIndexPart from "../actions/findIndexPart";
import findIndexSection from "../actions/findIndexSection";
import findIndexTask from "../actions/findIndexSubtask";
import updateTask from "../actions/updateTask";
import { Part, RawDevelopmentEffortSum, Type } from "../../types/Interface";
import updatePart from "../actions/updatePart";
=======
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initials/initialState';
import createProject from '../actions/createProject';
import createTask from '../actions/createTask';
import findIndexProject from '../actions/findIndexProject';
import findIndexSection from '../actions/findIndexSection';
import findIndexTask from '../actions/findIndexSubtask';
import updateTask from '../actions/updateTask';
import {
  DeleteData,
  Fields,
  Projects,
  RowUpdateData,
  Type,
  UpdateData,
  Part,
  RawDevelopmentEffortSum,
} from '../../types/Interface';
import { RootState } from '../store';
import { recalculateTask } from '../../utils/reclaculateTask';
import { sectionUpdate } from '../actions/sectionUpdate';
import { recalculateRow } from '../../utils/recalculateRow';
import updatePart from '../actions/updatePart';

export const recalculateRowAfterUpdate = createAsyncThunk(
  'project/recalculateAfterUpdate',
  async (props: RowUpdateData, { dispatch, getState }) => {
    const { projectId, sectionName } = props;

    const { projects }: { projects: Projects } = getState() as RootState;

    const section = projects.projects
      .find((project) => project.projectId === projectId)
      ?.sections.find((section) => section.name === sectionName);

    if (!section) return;
    const sectionValuesAfterRecalc = recalculateRow(section.tasks);

    dispatch(
      updateSection({
        projectId,
        sectionName,
        updatedValues: sectionValuesAfterRecalc,
      })
    );
  }
);

export const recalculateAfterDelete = createAsyncThunk(
  'project/recalculateAfterDelete',
  async (props: DeleteData, { dispatch, getState }) => {
    const { projectId, sectionName, subtaskId } = props;

    if (subtaskId) {
      dispatch(delSubtask(props));
    } else {
      dispatch(delTask(props));
    }

    dispatch(recalculateRowAfterUpdate({ projectId, sectionName }));
  }
);

export const recalculateAfterInputChange = createAsyncThunk(
  'project/recalculateInputNumber',
  async (props: UpdateData, { dispatch, getState }) => {
    const { projectId, sectionName, taskId, subtaskId } = props;

    if (subtaskId) {
      dispatch(updateSubtask(props));
    } else {
      dispatch(updateTasks(props));
    }

    const { projects }: { projects: Projects } = getState() as RootState;

    const task = projects.projects
      .find((project) => project.projectId === projectId)
      ?.sections.find((section) => section.name === sectionName)
      ?.tasks.find((task) => task.id === taskId);

    const subtask = projects.projects
      .find((project) => project.projectId === projectId)
      ?.sections.find((section) => section.name === sectionName)
      ?.tasks.find((task) => task.id === taskId)
      ?.subtasks?.find((subtask) => subtask.id === subtaskId);

    if (subtaskId) {
      const predictedMd = recalculateTask(subtask);

      dispatch(
        updateSubtask({
          projectId,
          sectionName,
          taskId,
          subtaskId,
          taskProps: Fields.PREDICTED_MD,
          updatedValue: predictedMd,
        })
      );
    } else {
      const predictedMd = recalculateTask(task);

      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.PREDICTED_MD,
          updatedValue: predictedMd,
        })
      );
    }

    dispatch(recalculateRowAfterUpdate({ projectId, sectionName }));
  }
);
>>>>>>> main

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
    },
    addProject: (state, action: PayloadAction<{ projectName: string; projectId: string }>) => {
      action.payload.projectName.length === 0
        ? console.log('Project name is empty!') // error handling add!!!
        : state.projects.find((project) => project.projectName === action.payload.projectName)
        ? console.log('The project with the given title exists') // error handling add!!!
        : state.projects.push(createProject(action.payload.projectName, action.payload.projectId));
    },
    delProject: (state, action: PayloadAction<{ projectId: string }>) => {
      state.projects.find((project) => project.projectId === action.payload.projectId)
        ? (state.projects = state.projects.filter(
            (project) => project.projectId !== action.payload.projectId
          ))
        : console.log(`Dont find project with ID "${action.payload.projectId}"`);
    },
    addTask: (
      state,
      action: PayloadAction<{
        projectId?: string;
        sectionName: string;
        taskName?: string;
        type: string;
        setInIndex?: number;
      }>
    ) => {
      const setInIndex = action.payload.setInIndex ?? 0;

      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const section = project.sections[findIndexSection(project, action.payload.sectionName)];

      const newTask = createTask(
        action.payload.sectionName,
        action.payload.taskName,
        action.payload.type
      );
      // const newState = [...section.tasks, newTask];
      section.tasks.splice(setInIndex, 0, newTask);
    },
    delTask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
      }>
    ) => {
      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const section = project.sections[findIndexSection(project, action.payload.sectionName)];

      const newTasks = section.tasks.filter((task) => task.id !== action.payload.taskId);

      section.tasks = newTasks;
    },
    addSubtask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        subtaskName: string;
        setInIndex?: number;
      }>
    ) => {
      const setInIndex = action.payload.setInIndex || 0;

      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const section = project.sections[findIndexSection(project, action.payload.sectionName)];

      const task = section.tasks[findIndexTask(section, action.payload.taskId)];

      const newSubtask = createTask(action.payload.sectionName, action.payload.subtaskName);

      // one test faild -> fcn set new value in props index..
      // test expected new value in last index of array

      if (task.type === Type.Group) {
        task.subtasks?.splice(setInIndex, 0, newSubtask);
      } else {
        return;
      }
    },
    delSubtask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        subtaskId: string;
      }>
    ) => {
      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const section = project.sections[findIndexSection(project, action.payload.sectionName)];

      const task = section.tasks[findIndexTask(section, action.payload.taskId)];

      const newSubtasks = task.subtasks?.filter(
        (subtask) => subtask.id !== action.payload.subtaskId
      );

      task.subtasks = newSubtasks;
    },
    updateSection: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        updatedValues: {
          maxMd: number;
          minMd: number;
          predictedMd: number;
          risk: number;
        };
      }>
    ) => {
      const { projectId, sectionName, updatedValues } = action.payload;

      const project = state.projects[findIndexProject(state, projectId)];

      const newSections = project.sections.map((section) =>
        section.name !== sectionName ? section : sectionUpdate(section, updatedValues)
      );

      project.sections = newSections;
    },
    updateTasks: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        taskProps: string;
        updatedValue: string | number | boolean;
      }>
    ) => {
      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const section = project.sections[findIndexSection(project, action.payload.sectionName)];

      const updatedTasks = section.tasks.map((task) =>
        task.id === action.payload.taskId
          ? updateTask(task, action.payload.taskProps, action.payload.updatedValue)
          : task
      );

      console.log(updatedTasks);

      section.tasks = updatedTasks;
    },
    updateSubtask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        subtaskId: string;
        taskProps: string;
        updatedValue: string | boolean | number;
      }>
    ) => {
      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const section = project.sections[findIndexSection(project, action.payload.sectionName)];

      const task = section.tasks[findIndexTask(section, action.payload.taskId)];

      const updatedSubtask = task.subtasks?.map((subtask) =>
        subtask.id === action.payload.subtaskId
          ? updateTask(subtask, action.payload.taskProps, action.payload.updatedValue)
          : subtask
      );

      task.subtasks = updatedSubtask;
    },
    reorder: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        startIndex: number;
        endIndex: number;
      }>
    ) => {
      const { projectId, sectionName, startIndex, endIndex } = action.payload;

      const sectionTasks =
        state.projects
          .find((project) => project.projectId === projectId)
          ?.sections?.find((section) => section.name === sectionName)?.tasks || [];

      const [removedTask] = sectionTasks?.splice(startIndex, 1);

      sectionTasks?.splice(endIndex, 0, removedTask);
    },
    updateParts: (
      state,
      action: PayloadAction<{
        projectId: string;
        partName: string;
        partProps: string;
        updatedValue: string | boolean | number;
      }>
    ) => {
<<<<<<< HEAD
      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];

      const rawDevelopmentEffortSum =
        project.rawDevelopmentEffortSum as RawDevelopmentEffortSum;
=======
      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const rawDevelopmentEffortSum = project.rawDevelopmentEffortSum as RawDevelopmentEffortSum;
>>>>>>> main

      const newState =
        rawDevelopmentEffortSum.parts.map((part) =>
          part.name === action.payload.partName
<<<<<<< HEAD
            ? updatePart(
                part,
                action.payload.partProps,
                action.payload.updatedValue
              )
=======
            ? updatePart(part, action.payload.partProps, action.payload.updatedValue)
>>>>>>> main
            : part
        ) || [];

      rawDevelopmentEffortSum.parts = newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearProjects,
  addProject,
  delProject,
  addTask,
  delTask,
  addSubtask,
  delSubtask,
  updateTasks,
  updateSubtask,
  updateSection,
  reorder,
  updateParts,
} = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
