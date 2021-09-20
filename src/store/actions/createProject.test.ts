import createProject from './createProject';

test('create project', () => {
    const result = createProject("Project A");
    expect(result.projectName).toBe("Project A");    
  });