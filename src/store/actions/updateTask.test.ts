import { Project, Type, Role } from '../../types/Interface';
import createProject from './createProject';
import createTask from './createTask';
import updateTask from './updateTask';

test('update tesk', () => {    
    const projectName = "Project A"
    const sectionName = "Mobile development";
    const taskName = "New task";
    const projects: Project[] = [];

    const project = createProject(projectName);
    projects.push(project);
    
    const result = createTask(projects, projectName, sectionName, taskName);

    const receivedProject = result[0];
    const receivedSection = receivedProject.sections![2];
    const receivedTask = receivedSection.tasks[0];

    const updatedName = "Updated task";
    const updatingResult = updateTask(projects, receivedTask.id, {name: updatedName, minMd: 10, maxMd: 30, risk: "H"});

    expect(updatingResult[0].sections![2].tasks[0].name).toBe(updatedName);
  });
