import createProject from './createProject';

test('create project', () => {
  const name = "Project A";
  const id = "1234";
  const result = createProject(name, id);
  expect(result.projectName).toBe(name);    
  expect(result.projectId).toBe(id);    
});