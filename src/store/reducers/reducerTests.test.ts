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

// test('add project having the same name', () => {
//   const previousState = initialState;
//   const title = "New Project Title";

//   let newState = projectReducer(previousState, addProject({projectName: title}));
//   try {
//     newState = projectReducer(newState, addProject({projectName: title}));
//   }
//   catch(error) {
//     expect(error).toBeInstanceOf(TypeError);
//     expect(error).toHaveProperty('message', 'Something bad happened!');
//   }

//   expect(newState.projects.length).toEqual(1);
// })

