import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import data from "../data.json";
import { Projects, Project, Task, Type, Role } from "../types/Interface";

const initialState: Projects = {
  projects: [],
};

const initialProject: Project = {
  projectName: "",
  estimatedBy: "",
  estimationDate: [],
  verifiedBy: "",
  verificationDate: "",
  estStart: "",
  estEns: "",
  teamSize: 0,
  timeBudget: 0,
  effort: 0,
  sections: [
    {
      sectionId: "",
      name: "Frontend development",
      minMd: 0,
      minMdFormula: "",
      maxMd: 0,
      maxMdFormula: "",
      predictedMd: 0,
      predictedMdFormula: "",
      risk: 0,
      riskFormula: "",
      tasks: [],
    },
    {
      sectionId: "",
      name: "Backend development",
      minMd: 0,
      minMdFormula: "",
      maxMd: 0,
      maxMdFormula: "",
      predictedMd: 0,
      predictedMdFormula: "",
      risk: 0,
      riskFormula: "",
      tasks: [],
    },
    {
      sectionId: "",
      name: "Mobile development",
      minMd: 0,
      minMdFormula: "",
      maxMd: 0,
      maxMdFormula: "",
      predictedMd: 0,
      predictedMdFormula: "",
      risk: 0,
      riskFormula: "",
      tasks: [],
    },
    {
      sectionId: "",
      name: "Design / UX / UI",
      minMd: 0,
      minMdFormula: "",
      maxMd: 0,
      maxMdFormula: "",
      predictedMd: 0,
      predictedMdFormula: "",
      risk: 0,
      riskFormula: "",
      tasks: [],
    },
    {
      sectionId: "",
      name: "Configuration / Setup / Deployment",
      minMd: 0,
      minMdFormula: "",
      maxMd: 0,
      maxMdFormula: "",
      predictedMd: 0,
      predictedMdFormula: "",
      risk: 0,
      riskFormula: "",
      tasks: [],
    },
  ],
  rawDevelopmentEffortSum: {
    name: "",
    main: {},
    parts: [],
  },
  summary: [],
  assumptions: [],
};

const initialTask: Task = {
  id: 0,
  type: Type.Group,
  name: "",
  role: Role.Empty,
  minMd: 0,
  maxMd: 0,
  predictedMd: 0,
  predictedMdFormula: "",
  risk: "",
  comment: {
    text: "",
    isImportant: false,
  },

  subtasks: [],
};

const shortDate = () => {
  const dateObj = new Date();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const date = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();
  const shortDate = date + "." + month + "." + year;
  return shortDate;
};

// const generateProject = (name: string): Project => ({
//     ...initialProject,
//     projectName: name
// })

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
      const newProject = Object.assign({}, initialProject, {
        projectName: action.payload.projectName,
        estimatedBy: action.payload.estimatedBy,
        estimationDate: shortDate(),
      });
      state.projects.push(newProject);
    },
    delProject: (state, action: PayloadAction<any>) => {
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
    addTask: (state, action: PayloadAction<any>) => {
      state.projects.find(
        (project) => project.projectName === action.payload.projectName
      )
        ? console.log("Probably i make add")
        : console.log(
            `Dont find project with name "${action.payload.projectName}" ! soo.. i dont make add this that :(`
          );
    },
    // addTask: (state, action: PayloadAction<any>) => {
    //   //   const project = getProject(state.projects, action.payload.projectName);
    //   //   const section = getSection(project, action.payload.sectionName);
    //   //   //   state.projects.push(newProject);
    //   //   const newProject = Object.assign({}, initialProject, {
    //   //     projectName: action.payload.projectName,
    //   //     estimatedBy: action.payload.estimatedBy,
    //   //     estimationDate: shortDate(),
    //   //   });
    //   //   console.log(current(section));
    //   ///------------
    //   //   const newState = [...state.projects].map((project) =>
    //   //     project.projectName === action.payload.projectName
    //   //       ? { ...project, sections: [...project.sections] }
    //   //       : project
    //   //   );
    // },
  },
});

// const getProject = (projects: Project[], chosenProject: any) => {
//   const project = projects.find(
//     (project) => project.projectName === chosenProject
//   );
//   return project
//     ? project
//     : console.log(
//         `Dont find project with name "${chosenProject}" ! soo.. i dont make add this that :(`
//       );
// };

// const getSection = (project: any, sectionName: string) => {
//   if (!project) {
//     return;
//   }
//   const section = project.sections.find(
//     (sec: { name: string }) => sec.name === sectionName
//   );
//   return section
//     ? section
//     : console.log(
//         `Dont find section with name "${section}" ! soo.. i dont make add this that :(`
//       );
// };

// Action creators are generated for each case reducer function
export const {
  initialProjects,
  clearProjects,
  getProjectNames,
  addProject,
  delProject,
  addTask,
} = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
//add task
//add sub
//del task
//del sub
//del proj -> done
//add proj -> done
