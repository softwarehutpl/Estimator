import createProject from './createProject';

test('create new project', () => {
    const result = createProject("Project A");
    expect(result.projectName).toBe("Project A");    
  });