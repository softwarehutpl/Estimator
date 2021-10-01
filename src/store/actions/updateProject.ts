import { Project } from '../../types/Interface';

export const updateProject = (
  project: Project,
  updatedValue: { field: string; value: string | number }
) => {
  const { field, value } = updatedValue;

  const newProject = { ...project, [field]: value };

  return newProject;
};
