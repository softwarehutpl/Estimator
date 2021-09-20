import { Project, Type, Role } from '../../types/Interface';
import createProject from './createProject';
import createTask from './createTask';
import deleteTask from './deleteTask';

test('delete task', () => {    
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

    const taskId = receivedTask.id;

    const deletingResult = deleteTask(projects, taskId);

    expect(deletingResult[0].sections![2].tasks).toBe([]);
    expect(deletingResult).not.toContain(taskId);
  });
