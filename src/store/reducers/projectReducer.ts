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
  RawDevelopmentEffortSum,
  Main,
  Project,
} from '../../types/Interface';
import { RootState } from '../store';
import { recalculateTask } from '../../utils/reclaculateTask';
import { sectionUpdate } from '../actions/sectionUpdate';
import { recalculateRow } from '../../utils/recalculateRow';
import { updatePart } from '../actions/updatePart';
import { RDSmain } from '../../utils/recalculateRDSMain';
import { recalculateTotalValues } from '../../utils/recalculateTotalValues';
import { updateTotal } from '../actions/updateTotal';
import { recalculatePerTeamMember } from '../../utils/recalculatePerTeamMember';
import { recalculateBudget as budgetRecalc } from '../../utils/recalculateBudget';
import updateDevInput from '../actions/updateDevInput';

export const recalculateBudget = createAsyncThunk(
  'project/recalculateBudget',
  async (props: { projectId: string }, { dispatch, getState }) => {
    const { projectId } = props;

    const { projects }: { projects: Projects } = getState() as RootState;

    const project = projects.projects.find((project) => project.projectId === projectId);

    if (!project) return;

    const result = budgetRecalc(project?.estStart, project?.estEns, project?.teamSize);

    dispatch(
      updateProjectHeader({ projectId, updatedValue: { field: 'timeBudget', value: result } })
    );
  }
);

export const recalculateTimeBudget = createAsyncThunk(
  'project/recalculateTimeBudget',
  async (
    props: {
      projectId: string;
      updatedValue: {
        field: string;
        value: string;
      };
    },
    { dispatch, getState }
  ) => {
    const { projectId, updatedValue } = props;

    dispatch(updateProjectHeader({ projectId, updatedValue }));

    if (updatedValue.field === 'estEns' || updatedValue.field === 'estStart') {
      const { projects }: { projects: Projects } = getState() as RootState;

      const project = projects.projects.find((project) => project.projectId === projectId);

      if (!project) return;

      const result = budgetRecalc(project?.estStart, project?.estEns, project?.teamSize);

      dispatch(
        updateProjectHeader({ projectId, updatedValue: { field: 'timeBudget', value: result } })
      );
    }
  }
);

export const recalculatePerMember = createAsyncThunk(
  'project/recalculatePerMember',
  async (
    props: { projectId: string; updatedValue: { field: string; value: number } | null },
    { dispatch, getState }
  ) => {
    const { projectId, updatedValue } = props;

    if (updatedValue) {
      dispatch(updateProjectHeader({ projectId, updatedValue }));
    }

    const { projects }: { projects: Projects } = getState() as RootState;

    const project = projects.projects.find((project) => project.projectId === projectId);
    const summary = projects.projects.find((project) => project.projectId === projectId)?.summary;

    const total = summary?.find((item) => item.name?.includes('Total'));
    const perTeamMember = summary?.find((item) => item.name?.includes('Team'));

    if (!total || !perTeamMember) return;

    const newTeamSize = updatedValue ? updatedValue.value : project?.teamSize || 1;
    const result = recalculatePerTeamMember(total, newTeamSize);

    dispatch(updateSummaryPerMember({ projectId, updatedValues: result }));

    dispatch(recalculateBudget({ projectId }));
  }
);

export const recalculateTotal = createAsyncThunk(
  'project/recalculateTotal',
  async (props: { projectId: string }, { dispatch, getState }) => {
    const { projectId } = props;

    const { projects }: { projects: Projects } = getState() as RootState;

    const developmentSum = projects.projects.find(
      (project) => project.projectId === projectId
    )?.rawDevelopmentEffortSum;

    const main = developmentSum?.main;
    const parts = developmentSum?.parts;

    if (!main || !parts) return;

    const result = recalculateTotalValues(main, parts);

    dispatch(updateSummaryTotal({ projectId, updatedValues: result }));

    dispatch(recalculatePerMember({ projectId, updatedValue: null }));
  }
);

export const recalculateDevelopmentSum = createAsyncThunk(
  'project/recalculateDevelopmentSum',
  async (props: { projectId: string }, { dispatch, getState }) => {
    const { projectId } = props;

    const { projects }: { projects: Projects } = getState() as RootState;

    const project = projects.projects.find((project) => project.projectId === projectId);

    const main = projects.projects.find((project) => project.projectId === projectId)
      ?.rawDevelopmentEffortSum?.main;

    if (!main || !project) return;

    const newMain = RDSmain(project);
    // const newParts = RDSparts(project.rawDevelopmentEffortSum);

    dispatch(updateDevelopmentSum({ projectId, newMain }));

    dispatch(recalculateTotal({ projectId }));
  }
);

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

    dispatch(recalculateDevelopmentSum({ projectId }));
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

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
    },
    importProject: (
      state,
      action: PayloadAction<{ importedProject: Project; projectId: string }>
    ) => {
      const importedProject = JSON.parse(JSON.stringify(action.payload.importedProject));

      state.projects[findIndexProject(state, action.payload.projectId)] = importedProject;
    },
    synchronizeProject: (
      state,
      action: PayloadAction<{ synchronizeProject: Project; projectId: string }>
    ) => {
      state.projects[findIndexProject(state, action.payload.projectId)] = JSON.parse(
        JSON.stringify(action.payload.synchronizeProject)
      );
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
      const setInIndex = action.payload.setInIndex || 0;

      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const section = project.sections[findIndexSection(project, action.payload.sectionName)];

      const newTask = createTask(
        action.payload.sectionName,
        action.payload.taskName,
        action.payload.type
      );

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
    updateSummaryPerMember: (
      state,
      action: PayloadAction<{
        projectId: string;
        updatedValues: {
          minMd: number;
          maxMd: number;
          predictedMd: number;
        };
      }>
    ) => {
      const { projectId, updatedValues } = action.payload;

      const project = state.projects[findIndexProject(state, projectId)];

      const newSummary = project.summary?.map((item) =>
        item.name?.includes('Team') ? updateTotal(item, updatedValues) : item
      );

      project.summary = newSummary;
    },
    updateSummaryTotal: (
      state,
      action: PayloadAction<{
        projectId: string;
        updatedValues: {
          minMd: number;
          maxMd: number;
          predictedMd: number;
          risk: number;
        };
      }>
    ) => {
      const { projectId, updatedValues } = action.payload;

      const project = state.projects[findIndexProject(state, projectId)];

      const newSummary = project.summary?.map((item) =>
        item.name?.includes('Total') ? updateTotal(item, updatedValues) : item
      );

      project.summary = newSummary;
    },
    updateDeliveryDate: (
      state,
      action: PayloadAction<{
        newDate: string;
        projectId: string;
      }>
    ) => {
      const { newDate, projectId } = action.payload;

      const project = state.projects[findIndexProject(state, projectId)];

      const newSummary = project.summary?.map((item) =>
        item.name?.includes('Delivery') ? { ...item, estDeliveryDate: newDate } : item
      );

      project.summary = newSummary;
    },
    updateDevelopmentSum: (
      state,
      action: PayloadAction<{
        projectId: string;
        newMain: Main;
        // newParts: Part[];
      }>
    ) => {
      const { projectId, newMain } = action.payload;
      const project = state.projects[findIndexProject(state, projectId)];

      if (!project) return;

      project.rawDevelopmentEffortSum!.main = newMain;
    },
    updateProjectHeader: (
      state,
      action: PayloadAction<{
        projectId: string;
        updatedValue: {
          field: string;
          value: string | number;
        };
      }>
    ) => {
      const { projectId, updatedValue } = action.payload;

      const project = state.projects[findIndexProject(state, projectId)];
      // if (project.hasOwnProperty(updatedValue.field)) {
      //@ts-ignore
      project[updatedValue.field] = updatedValue.value;
      // }

      // updateProject(project, updatedValue);
    },
    calculatePart: (state, action: PayloadAction<{ projectId: string }>) => {
      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      let parts = project.rawDevelopmentEffortSum?.parts;

      const result = parts.map((part) =>
        updatePart({
          minMd: part.minMd,
          maxMd: part.maxMd,
          role: part.role,
          minMdFormula: part.minMdFormula,
          maxMdFormula: part.maxMdFormula,
          procent: part.procent,
          predictedMd: part.predictedMd,
          predictedMdFormula: part.predictedMdFormula,
          name: part.name,
        })
      );

      project.rawDevelopmentEffortSum.parts = result;
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
      const project = state.projects[findIndexProject(state, action.payload.projectId)];

      const rawDevelopmentEffortSum = project.rawDevelopmentEffortSum as RawDevelopmentEffortSum;

      const main = rawDevelopmentEffortSum.main;

      const newState =
        rawDevelopmentEffortSum.parts.map((part) =>
          part.name === action.payload.partName
            ? updateDevInput(part, main, action.payload.partProps, action.payload.updatedValue)
            : part
        ) || [];

      rawDevelopmentEffortSum.parts = newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  importProject,
  clearProjects,
  addProject,
  delProject,
  addTask,
  delTask,
  addSubtask,
  delSubtask,
  updateTasks,
  updateSubtask,
  updateDeliveryDate,
  updateDevelopmentSum,
  updateSummaryPerMember,
  updateProjectHeader,
  updateSection,
  updateSummaryTotal,
  reorder,
  synchronizeProject,

  calculatePart,
  updateParts,
} = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
