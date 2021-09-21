import projectReducer from "./projectReducer";
import {
  clearProjects,
  addProject,
  delProject,
  addTask,
  delTask,
  addSubtask,
} from "./projectReducer";
import initialProject from "../initials/initialProject";
import initialState from "../initials/initialState";
import { Role, Task } from "../../types/Interface";
import test_delete_project_state from "./projectReducerTestUtils";


test('add new project', () => {
  const previousState = initialState;
  const title = "New Project Title";
  const id = "123";
  const newState = projectReducer(previousState, addProject({projectName: title, projectId: id}));
  expect(newState.projects.length).toEqual(1);
  expect(newState.projects[0].projectName).toEqual(title);
  expect(newState.projects[0].projectId).toEqual(id);
})

test('add second project', () => {
  const previousState = initialState;
  const title1 = "New Project Title 1";
  const title2 = "New Project Title 2";
  const id1 = "123";
  const id2 = "456";

  let newState = projectReducer(previousState, addProject({projectName: title1, projectId: id1}));
  newState = projectReducer(newState, addProject({projectName: title2, projectId: id2}));

  expect(newState.projects.length).toEqual(2);
  expect(newState.projects[0].projectName).toEqual(title1);
  expect(newState.projects[1].projectName).toEqual(title2);
  expect(newState.projects[0].projectId).toEqual(id1);
  expect(newState.projects[1].projectId).toEqual(id2);
})

test('add project having the same name', () => {
  const previousState = initialState;
  const title = "New Project Title";
  const id = "123";
  let newState = projectReducer(previousState, addProject({projectName: title, projectId: id}));
  
  const consoleSpy = jest.spyOn(console, 'log');

  try {
    newState = projectReducer(newState, addProject({projectName: title, projectId: id}));
  }
  // version for handing errors
  // catch(error) {
  //   expect(error).toBeInstanceOf(TypeError);
  //   expect(error).toHaveProperty('message', 'Something bad happened!');
  // }
  // version for console log
  catch(consoleSpy) {
    expect(consoleSpy).toHaveBeenCalledWith('error');
    }
  expect(newState.projects.length).toEqual(1);
})

test('delete project', () => {
  const previousState = test_delete_project_state;

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

test('delete task', () => {
  const previousState = {
    "projects": 
    [
      {"assumptions": [], "effort": 0, "estEns": "", "estStart": "", "estimatedBy": "", "estimationDate": "21.09.2021", "projectId": "1b3cada1-6c61-4974-9886-d3651f76007d", "projectName": "New Project Title", 
      "rawDevelopmentEffortSum": 
      {"main": {}, "name": "", "parts": []}, 
      "sections": 
      [
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk":  0, "riskFormula": "", "sectionId": "", 
        "tasks": 
        [
          {"comment": {"isImportant": false, "text": ""}, "id": "f819c1a6-5237-44b5-a4fe-623f911c2a8c", "maxMd": 0, "minMd": 0, "name": "New task", "predictedMd": 0, "predictedMdFormula": "", "risk": "L", "role": "BD", "subtasks": [], "type": "task"}
        ]}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk":   0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "",   "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}],
         "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""}]};

  const taskId = "f819c1a6-5237-44b5-a4fe-623f911c2a8c";
  const sectionName = "Backend development";
  const projectId = "1b3cada1-6c61-4974-9886-d3651f76007d";
  // const newState = projectReducer(previousState, delTask({projectId: projectId, sectionName: sectionName, id: taskId}));

  // const expectedState = {"projects": []};
  // expect(newState).toEqual(expectedState);

})

describe('add new group', () => {
  it('asdasdas', ()=>{ expect(true).toBe(true)})

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

function deleteTask(arg0: { taskId: any; }): import("redux").AnyAction {
  throw new Error("Function not implemented.");
}

