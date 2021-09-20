import { Project, Type, Role } from '../../types/Interface';
import createProject from './createProject';
import createGroup from './createGroup';
import deleteGroup from './deleteGroup';

test('delete group', () => {    
    const projectName = "Project A"
    const sectionName = "Mobile development";
    const groupName = "New group";
    const projects: Project[] = [];

    const project = createProject(projectName);
    projects.push(project);
    
    const result = createGroup(projects, projectName, sectionName, groupName);

    const receivedProject = result[0];
    const receivedSection = receivedProject.sections![2];
    const receivedGroup = receivedSection.tasks[0];

    const groupId = receivedGroup.id;

    const deletingResult = deleteGroup(projects, groupId);

    expect(deletingResult[0].sections![2].tasks).toBe([]);
    expect(deletingResult).not.toContain(groupId);
  });
