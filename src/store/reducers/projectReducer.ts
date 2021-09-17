import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../../data.json";
import { Project } from "../../types/Interface";
import AddTaskInterface from "../actions/createNewTask";
import initialState from "../initials/initialState";
import createNewProject from "../actions/createNewProject";
import createNewTask from "../actions/createNewTask";

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    initialProjects: (state) => {
      const projects: any[] = [...data.projects];
      state.projects = projects;
    },
    clearProjects: (state) => {
      state.projects = [];
    },
    getProjectNames: (state) => {
      state.projects.map((project) => console.log(project.projectName));
    },
    addProject: (state, action: PayloadAction<Project>) => {
      const newProject = createNewProject(action.payload.projectName);
      state.projects.push(newProject);
    },
    delProject: (state, action: PayloadAction<Project>) => {
      state.projects.find(
        (project) => project.projectName === action.payload.projectName
      )
        ? (state.projects = state.projects.filter(
            (project) => project.projectName !== action.payload.projectName
          ))
        : console.log(
            `Dont find project with name "${action.payload.projectName}"`
          );
    },
    addTask: (state, action: PayloadAction<AddTaskInterface>) => {
      const newState = createNewTask(
        state.projects,
        action.payload.projectName,
        action.payload.sectionName,
        action.payload.taskName
      );
      state.projects = newState;
    },
    delTask: (state, action: PayloadAction<any>) => {
      console.log(action);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialProjects,
  clearProjects,
  getProjectNames,
  addProject,
  delProject,
  addTask,
  delTask,
} = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
//add task -> done
//add sub
//del task
//del sub
//del proj -> done
//add proj -> done
