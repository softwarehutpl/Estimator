import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import {
  initialProjects,
  clearProjects,
  addProject,
  delProject,
  getProjectNames,
  addTask,
} from "./projectsSlice";

export default function Actions() {
  const [projectName, setProjectName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [estimatedBy, setEstimatedBy] = useState("");
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <div>
      <p>---------- INITIAL PROJECTS ----------</p>
      <button onClick={() => dispatch(initialProjects())}>
        initialProjects
      </button>
      <button onClick={() => dispatch(clearProjects())}>clearProjects</button>
      <p>---------- GET PROJECTS NAMES ----------</p>
      <button onClick={() => dispatch(getProjectNames())}>
        getProjectNames
      </button>
      <p>--------- ADD NEW PROJECT -----------</p>
      <input
        type="text"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        placeholder="Project Name"
      />
      <input
        type="text"
        value={estimatedBy}
        onChange={(event) => setEstimatedBy(event.target.value)}
        placeholder="Estimated By"
      />
      <button
        onClick={() => {
          dispatch(
            addProject({
              projectName: projectName,
              estimatedBy: estimatedBy,
            })
          );
          setProjectName("");
          setEstimatedBy("");
        }}
      >
        addProject
      </button>
      <p>--------- DEL PROJECT -----------</p>
      <input
        type="text"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        placeholder="Project Name To Del"
      />
      <button
        onClick={() => {
          dispatch(delProject({ projectName: projectName }));
          setProjectName("");
        }}
      >
        delProject
      </button>
      <p>--------- ADD TASK -----------</p>
      Frontend development <br />
      <br />
      <input
        type="text"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        placeholder="Project Name To Add Task"
      />
      <input
        type="text"
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder="Section Name To Add Task"
      />
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Task Name To Add Task"
      />
      <button
        onClick={() => {
          dispatch(
            addTask({
              projectName: projectName,
              sectionName: sectionName,
              taskName: taskName,
            })
          );
          setSectionName("");
          setProjectName("");
          setTaskName("");
        }}
      >
        addTask
      </button>
    </div>
  );
}
