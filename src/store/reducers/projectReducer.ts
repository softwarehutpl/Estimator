import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initials/initialState";
import createProject from "../actions/createProject";
import createTask from "../actions/createTask";
import TableTasks from "../../components/Table/TableTasks/TableTasks";
import findIndexProject from "../actions/findIndexProject";
import findIndexPart from "../actions/findIndexPart";
import findIndexSection from "../actions/findIndexSection";
import findIndexTask from "../actions/findIndexSubtask";
import updateTask from "../actions/updateTask";
import { Type, Part, Main } from "../../types/Interface";

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
    },
    addProject: (
      state,
      action: PayloadAction<{ projectName: string; projectId: string }>
    ) => {
      action.payload.projectName.length === 0
        ? console.log("Project name is empty!") // error handling add!!!
        : state.projects.find(
            (project) => project.projectName === action.payload.projectName
          )
        ? console.log("The project with the given title exists") // error handling add!!!
        : state.projects.push(
            createProject(action.payload.projectName, action.payload.projectId)
          );
    },
    delProject: (state, action: PayloadAction<{ projectId: string }>) => {
      state.projects.find(
        (project) => project.projectId === action.payload.projectId
      )
        ? (state.projects = state.projects.filter(
            (project) => project.projectId !== action.payload.projectId
          ))
        : console.log(
            `Dont find project with ID "${action.payload.projectId}"`
          );
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

      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];

      const section =
        project.sections[findIndexSection(project, action.payload.sectionName)];

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
        id: string;
      }>
    ) => {
      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];

      const section =
        project.sections[findIndexSection(project, action.payload.sectionName)];

      const newTasks = section.tasks.filter(
        (task) => task.id !== action.payload.id
      );

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
      const setInIndex = action.payload.setInIndex ?? 0;

      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];

      const section =
        project.sections[findIndexSection(project, action.payload.sectionName)];

      const task = section.tasks[findIndexTask(section, action.payload.taskId)];

      const newSubtask = createTask(
        action.payload.sectionName,
        action.payload.subtaskName
      );

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
      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];

      const section =
        project.sections[findIndexSection(project, action.payload.sectionName)];

      const task = section.tasks[findIndexTask(section, action.payload.taskId)];

      const newSubtasks = task.subtasks?.filter(
        (subtask) => subtask.id !== action.payload.subtaskId
      );

      task.subtasks = newSubtasks;
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
      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];

      const section =
        project.sections[findIndexSection(project, action.payload.sectionName)];

      const updatedTasks = section.tasks.map((task) =>
        task.id === action.payload.taskId
          ? updateTask(
              task,
              action.payload.taskProps,
              action.payload.updatedValue
            )
          : task
      );

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
      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];

      const section =
        project.sections[findIndexSection(project, action.payload.sectionName)];

      const task = section.tasks[findIndexTask(section, action.payload.taskId)];

      const updatedSubtask = task.subtasks?.map((subtask) =>
        subtask.id === action.payload.subtaskId
          ? updateTask(
              subtask,
              action.payload.taskProps,
              action.payload.updatedValue
            )
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
          ?.sections?.find((section) => section.name === sectionName)?.tasks ||
        [];

      const [removedTask] = sectionTasks?.splice(startIndex, 1);

      sectionTasks?.splice(endIndex, 0, removedTask);
    },
    updatePart: (
      state,
      action: PayloadAction<{
        projectId: string;
        partName: string;
        parts: Part[];
      }>
    ) => {
      const project =
        state.projects[findIndexProject(state, action.payload.projectId)];
      const part = project.rawDevelopmentEffortSum?.parts[findIndexPart(
        project,
        action.payload.partName)];
        //TODO: dla Mariusza
      );
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
  reorder,
  updatePart,
} = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
