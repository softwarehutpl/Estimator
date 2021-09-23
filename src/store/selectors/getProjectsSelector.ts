import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { Project } from "../../types/Interface";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state.projects;

export const getProjectSelector = (projectId: string) =>
  createDraftSafeSelector(selectSelf, (state) => {
    const project = state.projects.find(
      (project: Project) => project.projectId === projectId
    );
    return project ? project : null;
  });

export const getProjectsData = () =>
  createDraftSafeSelector(selectSelf, (state) => {
    const projectData = state.projects.map((project: Project) =>
      Object.create({
        projectName: project.projectName,
        projectId: project.projectId,
      })
    );
    return projectData ? projectData : null;
  });
