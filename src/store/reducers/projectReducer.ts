import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initials/initialState';
import createProject from '../actions/createProject';
import createTask from '../actions/createTask';

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
      }>
    ) => {
      const newTask = createTask(
        action.payload.sectionName,
        (action.payload.taskName = ''),
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
      const newSubTask = createTask(action.payload.sectionName, action.payload.subtaskName);

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
    delSubtask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        subtaskId: string;
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
                                  subtasks: (task.subtasks = task.subtasks?.filter(
                                    (subtask) => subtask.id !== action.payload.subtaskId
                                  )),
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
    updateTasks: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        taskProps: string;
        updatedValue: string;
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
                                    action.payload.taskProps === 'name'
                                      ? action.payload.updatedValue
                                      : task.name,
                                  minMd:
                                    action.payload.taskProps === 'minMd'
                                      ? Number(action.payload.updatedValue)
                                      : task.minMd,
                                  maxMd:
                                    action.payload.taskProps === 'maxMd'
                                      ? Number(action.payload.updatedValue)
                                      : task.maxMd,
                                  risk:
                                    action.payload.taskProps === 'risk'
                                      ? action.payload.updatedValue
                                      : task.risk,
                                  comment: {
                                    text:
                                      action.payload.taskProps === 'commentText'
                                        ? action.payload.updatedValue
                                        : task.comment.text,
                                    isImportant:
                                      action.payload.taskProps === 'commentImportant'
                                        ? action.payload.updatedValue === 'true'
                                          ? true
                                          : action.payload.updatedValue === 'false'
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
    updateSubtask: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        taskId: string;
        subtaskId: string;
        taskProps: string;
        updatedValue: string;
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
                                  subtasks: task.subtasks?.map((subtask) =>
                                    subtask.id === action.payload.subtaskId
                                      ? {
                                          ...subtask,
                                          name:
                                            action.payload.taskProps === 'name'
                                              ? action.payload.updatedValue
                                              : task.name,
                                          minMd:
                                            action.payload.taskProps === 'minMd'
                                              ? Number(action.payload.updatedValue)
                                              : task.minMd,
                                          maxMd:
                                            action.payload.taskProps === 'maxMd'
                                              ? Number(action.payload.updatedValue)
                                              : task.maxMd,
                                          risk:
                                            action.payload.taskProps === 'risk'
                                              ? action.payload.updatedValue
                                              : task.risk,
                                          comment: {
                                            text:
                                              action.payload.taskProps === 'commentText'
                                                ? action.payload.updatedValue
                                                : task.comment.text,
                                            isImportant:
                                              action.payload.taskProps === 'commentImportant'
                                                ? action.payload.updatedValue === 'true'
                                                  ? true
                                                  : action.payload.updatedValue === 'false'
                                                  ? false
                                                  : task.comment.isImportant
                                                : task.comment.isImportant,
                                          },
                                        }
                                      : subtask
                                  ),
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
    reorder: (
      state,
      action: PayloadAction<{
        projectId: string;
        sectionName: string;
        startIndex?: number;
        endIndex: number;
      }>
    ) => {
      const sectionTasks =
        state.projects
          .find((project) => project.projectId === action.payload.projectId)
          ?.sections?.find((section) => section.name === action.payload.sectionName)?.tasks || [];

      const [removedTask] = sectionTasks?.splice(sectionTasks.length - 1, 1) || [];
      sectionTasks?.splice(action.payload.endIndex + 1, 0, removedTask);

      const newState = [...state.projects].map((project) =>
        project.projectId === action.payload.projectId
          ? {
              ...project,
              sections: project.sections
                ? [...project.sections].map((section) =>
                    section.name === action.payload.sectionName
                      ? {
                          ...section,
                          tasks: sectionTasks,
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
  delSubtask,
  updateTasks,
  updateSubtask,
  reorder,
} = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
//add task -> done
//add sub -> done
//del task -> done
//del sub -> done
//del proj -> done
//add proj -> done
//get projects -> done
//edit task -> done
//edit subtask -> done
