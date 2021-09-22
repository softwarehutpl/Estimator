import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initials/initialState";
import createProject from "../actions/createProject";
import createTask from "../actions/createTask";

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
      // if (
      //   state.projects.find(
      //     (project) => project.projectName === action.payload.projectName
      //   )
      // ) {
      //   console.log("Error"); // error handling add!!!
      // } else {
      //   state.projects.push(createProject(action.payload.projectName));
      // }

      state.projects.find(
        (project) => project.projectName === action.payload.projectName
      )
        ? console.log("Error") // error handling add!!!
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
        taskName: string;
        type: string;
      }>
    ) => {
      const newTask = createTask(
        action.payload.sectionName,
        action.payload.taskName,
        action.payload.type
      );

      const newState = [...state.projects].map((project) =>
        project.projectId === action.payload.projectId
          ? {
              ...project,
              sections: project.sections
                ? [...project.sections].map((section) =>
                    section.name === action.payload.sectionName
                      ? { ...section, tasks: section.tasks.concat(newTask) }
                      : section
                  )
                : [],
            }
          : project
      );

      state.projects = newState;
    },
    delTask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        id: string;
      }>
    ) => {
      const newState = [...state.projects].map((project) =>
        project.projectId === action.payload.projectId
          ? {
              ...project,
              sections: project.sections
                ? [...project.sections].map((section) =>
                    section.name === action.payload.sectionName
                      ? {
                          ...section,
                          tasks: (section.tasks = section.tasks.filter(
                            (task) => task.id !== action.payload.id
                          )),
                        }
                      : section
                  )
                : [],
            }
          : project
      );
      state.projects = newState;
    },
    addSubtask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        subtaskName: string;
      }>
    ) => {
      const newSubTask = createTask(
        action.payload.sectionName,
        action.payload.subtaskName
      );

      const newState = [...state.projects].map((project) =>
        project.projectId === action.payload.projectId
          ? {
              ...project,
              sections: project.sections
                ? [...project.sections].map((section) =>
                    section.name === action.payload.sectionName
                      ? {
                          ...section,
                          tasks: section.tasks?.map((task) =>
                            task.id === action.payload.taskId
                              ? {
                                  ...task,
                                  subtasks: task.subtasks?.concat(newSubTask),
                                }
                              : task
                          ),
                        }
                      : section
                  )
                : [],
            }
          : project
      );
      state.projects = newState;
    },
    delSubtask: () => {},
    updateTasks: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        taskProps: string;
        updatedValue: any;
      }>
    ) => {
      const newState = [...state.projects].map((project) =>
        project.projectId === action.payload.projectId
          ? {
              ...project,
              sections: project.sections
                ? [...project.sections].map((section) =>
                    section.name === action.payload.sectionName
                      ? {
                          ...section,
                          tasks: section.tasks?.map((task) =>
                            task.id === action.payload.taskId
                              ? {
                                  ...task,
                                  name:
                                    action.payload.taskProps === "name"
                                      ? action.payload.updatedValue
                                      : task.name,
                                  minMd:
                                    action.payload.taskProps === "minMd"
                                      ? Number(action.payload.updatedValue)
                                      : task.minMd,
                                  maxMd:
                                    action.payload.taskProps === "maxMd"
                                      ? Number(action.payload.updatedValue)
                                      : task.maxMd,
                                  risk:
                                    action.payload.taskProps === "risk"
                                      ? action.payload.updatedValue
                                      : task.risk,
                                  comment: {
                                    text:
                                      action.payload.taskProps === "commentText"
                                        ? action.payload.updatedValue
                                        : task.comment.text,
                                    isImportant:
                                      action.payload.taskProps ===
                                      "commentImportant"
                                        ? action.payload.updatedValue === "true"
                                          ? true
                                          : action.payload.updatedValue ===
                                            "false"
                                          ? false
                                          : task.comment.isImportant
                                        : task.comment.isImportant,
                                  },
                                }
                              : task
                          ),
                        }
                      : section
                  )
                : [],
            }
          : project
      );
      state.projects = newState;
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
  updateTasks,
} = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
//add task -> done
//add sub -> done
//del task -> done
//del sub -> in progress
//del proj -> done
//add proj -> done
//get projects -> done
//edit task -> done
