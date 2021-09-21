import { Project, Type, Role } from '../../types/Interface';
import createProject from './createProject';
import createTask from './createTask';

describe('testing createTask', () => {
  it('create a new task', () => {
    const sectionName = "Backend development";
    const taskName = "New task";
    const type = Type.Task;
    const result = createTask(sectionName, taskName, type);

    expect(result.name).toBe(taskName);
    expect(result.minMd).toBe(0);
    expect(result.maxMd).toBe(0);
    expect(result.predictedMd).toBe(0);
    expect(result.type).toBe(Type.Task);
    expect(result.role).toBe(Role.BD);
    expect(result.risk).toBe("L");
    expect(result.subtasks!.length).toBe(0);
  }),

  it('create a new group', () => {
    const sectionName = "Backend development";
    const taskName = "New task";
    const type = Type.Group;
    const result = createTask(sectionName, taskName, type);

    expect(result.name).toBe(taskName);
    expect(result.minMd).toBe(null);
    expect(result.maxMd).toBe(null);
    expect(result.predictedMd).toBe(null);
    expect(result.type).toBe(Type.Group);
    expect(result.role).toBe(Role.BD);
    expect(result.risk).toBe("");
    expect(result.subtasks!.length).toBe(0);
  })
});
    

