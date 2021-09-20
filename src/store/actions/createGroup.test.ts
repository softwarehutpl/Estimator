import { Project, Type, Role } from '../../types/Interface';
import createProject from './createProject';
import createGroup from './createGroup';

test('create group', () => {    
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

    expect(receivedProject.projectName).toBe(projectName);
    expect(receivedSection.name).toBe(sectionName);

    expect(receivedGroup.name).toBe(groupName);
    expect(receivedGroup.type).toBe(Type.Group);
    expect(receivedGroup.role).toBe(Role.MD);
    expect(receivedGroup.minMd).toBe(null);
    expect(receivedGroup.maxMd).toBe(null);
    expect(receivedGroup.maxMd).toBe(null);
    expect(receivedGroup.subtasks!.length).toBe(0);
  });
