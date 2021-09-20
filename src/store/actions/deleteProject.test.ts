import createProject from './createProject';

test('delete project', () => {
    const projectNameA = "Project A";
    const projectNameB = "Project B";
    const projects: Project[] = [];

    const projectA = createProject(projectNameA);
    const projectB = createProject(projectNameB);
    projects.push(projectA);
    projects.push(projectB);

    const result = deleteProject("Project A");

    expect(result[0].projectName).toBe("Project B");
    expect(result.projectName).toBe("Project B");
    expect(result).not.toContain(projectNameA);
  });
