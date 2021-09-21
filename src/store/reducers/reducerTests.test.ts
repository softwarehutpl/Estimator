import projectReducer from "./projectReducer";
import {
  initialProjects,
  clearProjects,
  addProject,
  delProject,
  addTask,
  delTask,
  addSubtask,
} from "../reducers/projectReducer";
import initialProject from "../initials/initialProject";
import initialState from "../initials/initialState";
import { Role, Task } from "../../types/Interface";


test('add new project', () => {
  const previousState = initialState;
  const title = "New Project Title";
  const newState = projectReducer(previousState, addProject({projectName: title}));
  expect(newState.projects.length).toEqual(1);
  expect(newState.projects[0].projectName).toEqual(title);
})

test('add second project', () => {
  const previousState = initialState;
  const title1 = "New Project Title 1";
  const title2 = "New Project Title 2";

  let newState = projectReducer(previousState, addProject({projectName: title1}));
  newState = projectReducer(newState, addProject({projectName: title2}));

  expect(newState.projects.length).toEqual(2);
  expect(newState.projects[0].projectName).toEqual(title1);
  expect(newState.projects[1].projectName).toEqual(title2);
})

test('add project having the same name', () => {
  const previousState = initialState;
  const title = "New Project Title";
  const consoleSpy = jest.spyOn(console, 'log');

  let newState = projectReducer(previousState, addProject({projectName: title}));
  try {
    newState = projectReducer(newState, addProject({projectName: title}));
  }
  // version for handing errors
  // catch(error) {
  //   expect(error).toBeInstanceOf(TypeError);
  //   expect(error).toHaveProperty('message', 'Something bad happened!');
  // }
  // version for console log
  catch(consoleSpy) {
    expect(consoleSpy).toHaveBeenCalledWith('Error');
    }
  expect(newState.projects.length).toEqual(1);
})

test('delete project', () => {
  const previousState = {
    "projects": 
    [
      {"assumptions": [], 
      "effort": 0, 
      "estEns": "", 
      "estStart": "", 
      "estimatedBy": "", 
      "estimationDate": "21.09.2021", 
      "projectId": "1b3cada1-6c61-4974-9886-d3651f76007d", 
      "projectName": "New Project Title", 
      "rawDevelopmentEffortSum": {"main": {}, "name": "", "parts": []}, 
      "sections": 
      [
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}
      ], 
      "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""}
    ]
  };

  const projectId = "1b3cada1-6c61-4974-9886-d3651f76007d";
  const newState = projectReducer(previousState, delProject({projectId: projectId}));

  const expectedState = {"projects": []};
  expect(newState).toEqual(expectedState);
})

test('add new task', () => {
  const previousState = {
    "projects": 
    [
      {"assumptions": [], 
      "effort": 0, 
      "estEns": "", 
      "estStart": "", 
      "estimatedBy": "", 
      "estimationDate": "21.09.2021", 
      "projectId": "1b3cada1-6c61-4974-9886-d3651f76007d", 
      "projectName": "New Project Title", 
      "rawDevelopmentEffortSum": {"main": {}, "name": "", "parts": []}, 
      "sections": 
      [
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}
      ], 
      "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""}
    ]
  };

  const projectId = "1b3cada1-6c61-4974-9886-d3651f76007d";
  const sectionName = "Backend development";
  const taskName = "New task";
  const type = "task";
  const newState = projectReducer(previousState, addTask({projectId: projectId, sectionName: sectionName, taskName: taskName, type: type}));

  const receivedSections = newState.projects[0].sections!;
  expect(receivedSections[1].tasks[0].name).toEqual(taskName);
  expect(receivedSections[1].tasks[0].minMd).toEqual(0);
  expect(receivedSections[1].tasks[0].maxMd).toEqual(0);
  expect(receivedSections[1].tasks[0].predictedMd).toEqual(0);
  expect(receivedSections[1].tasks[0].risk).toEqual("L");
  expect(receivedSections[1].tasks[0].role).toEqual(Role.BD);
})

test('add new group', () => {
  const previousState = {
    "projects": 
    [
      {"assumptions": [], 
      "effort": 0, 
      "estEns": "", 
      "estStart": "", 
      "estimatedBy": "", 
      "estimationDate": "21.09.2021", 
      "projectId": "1b3cada1-6c61-4974-9886-d3651f76007d", 
      "projectName": "New Project Title", 
      "rawDevelopmentEffortSum": {"main": {}, "name": "", "parts": []}, 
      "sections": 
      [
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}
      ], 
      "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""}
    ]
  };

  const projectId = "1b3cada1-6c61-4974-9886-d3651f76007d";
  const sectionName = "Backend development";
  const taskName = "New group";
  const type = "group";
  const newState = projectReducer(previousState, addTask({projectId: projectId, sectionName: sectionName, taskName: taskName, type: type}));

  const receivedSections = newState.projects[0].sections!;
  expect(receivedSections[1].tasks[0].name).toEqual(taskName);
  expect(receivedSections[1].tasks[0].minMd).toEqual(null);
  expect(receivedSections[1].tasks[0].maxMd).toEqual(null);
  expect(receivedSections[1].tasks[0].predictedMd).toEqual(null);
  expect(receivedSections[1].tasks[0].risk).toEqual("");
  expect(receivedSections[1].tasks[0].role).toEqual(Role.BD);
})

