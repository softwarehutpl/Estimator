import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  initialProjects,
  clearProjects,
  addProject,
  delProject,
  addTask,
  delTask,
  addSubtask,
} from "../reducers/projectReducer";

export default function RootStore() {
  const [projectName, setProjectName] = useState("");
  const [sectionName, setSectionName] = useState("Frontend development");
  const [taskName, setTaskName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [estimatedBy, setEstimatedBy] = useState("");
  const projects = useAppSelector((state) => state.projects.projects);
  const projectsData = useAppSelector((state) =>
    state.projects.projects.map((project) =>
      Object.create({
        projectName: project.projectName,
        projectId: project.projectId,
      })
    )
  );
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
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        ---------- INITIAL PROJECTS ----------
      </p>
      <button onClick={() => dispatch(initialProjects())}>
        initialProjects
      </button>
      <button onClick={() => dispatch(clearProjects())}>clearProjects</button>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        ---------- PROJECTS NAMES ----------
      </p>
      {projectsData.map((project) => (
        <li
          key={project.projectName}
        >{`projectName ${project.projectName} id ${project.projectId}`}</li>
      ))}
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        --------- ADD NEW PROJECT -----------
      </p>
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
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        --------- DEL PROJECT -----------
      </p>
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
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        --------- ADD TASK -----------
      </p>
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
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        --------- DEL TASK -----------
      </p>
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
        value={taskId}
        onChange={(event) => setTaskId(event.target.value)}
        placeholder="Task ID To Dell Task"
      />
      <button
        onClick={() => {
          dispatch(
            delTask({
              projectName: projectName,
              sectionName: sectionName,
              id: taskId,
            })
          );
          setSectionName("");
          setProjectName("");
          setTaskId("");
        }}
      >
        delTask
      </button>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        --------- ADD SUBTASK -----------
      </p>
      Frontend development <br />
      <br />
      <input
        type="text"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        placeholder="Project Name To Add Subtask"
      />
      <input
        type="text"
        value={sectionName}
        onChange={(event) => setSectionName(event.target.value)}
        placeholder="Section Name To Add Subtask"
      />
      <input
        type="text"
        value={taskId}
        onChange={(event) => setTaskId(event.target.value)}
        placeholder="Task ID To Add Subtask"
      />
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Task Name To Add Subtask"
      />
      <button
        onClick={() => {
          dispatch(
            addSubtask({
              projectName: projectName,
              sectionName: sectionName,
              taskId: taskId,
              subtaskName: taskName,
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
