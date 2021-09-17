import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  initialProjects,
  clearProjects,
  addProject,
  delProject,
  getProjectNames,
  addTask,
  delTask,
} from "../reducers/projectReducer";

export default function RootStore() {
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
    <div
      style={{
        border: "2px solid black",
        padding: "20px",
        backgroundColor: "#E6E6E6",
      }}
    >
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
      <p>--------- DEL TASK -----------</p>
      <input
        type="text"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        placeholder="Project Name To Dell Task"
      />
      <input
        type="text"
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder="Section Name To Dell Task"
      />
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Task Name To Dell Task"
      />
      <button
        onClick={() => {
          dispatch(
            delTask({
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
        delTask
      </button>
    </div>
  );
}
