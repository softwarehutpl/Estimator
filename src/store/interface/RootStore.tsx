import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Link } from "react-router-dom";
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
  const [sectionName, setSectionName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [estimatedBy, setEstimatedBy] = useState("");
  const [projectId, setProjectId] = useState("");
  const projects = useAppSelector((state) => state.projects.projects);
  // const projectsData = useAppSelector((state) =>
  //   state.projects.projects.map((project) =>
  //     Object.create({
  //       projectName: project.projectName,
  //       projectId: project.projectId,
  //     })
  //   )
  // );
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
<<<<<<< HEAD
      <nav>
=======
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        ---------- INITIAL PROJECTS ----------
      </p>
      <nav className="p-d-flex p-jc-around">
>>>>>>> 5185ae15c68fa5d9bbefbb33ba2b87d1baff9477
        <Link to="/">Home</Link>
        <Link to="/project">Project</Link>
      </nav>
      <p>---------- INITIAL PROJECTS ----------</p>
      <button onClick={() => dispatch(initialProjects())}>
        initialProjects
      </button>
      <button onClick={() => dispatch(clearProjects())}>clearProjects</button>
<<<<<<< HEAD
      <p>---------- PROJECTS NAMES ----------</p>
      {/* {projectsData.map((project) => (
        <li
          key={project.projectName}
        >{`projectName ${project.projectName} id ${project.projectId}`}</li>
      ))} */}
      <p>--------- ADD NEW PROJECT -----------</p>
=======
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
>>>>>>> 5185ae15c68fa5d9bbefbb33ba2b87d1baff9477
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
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder="Project ID To Del"
      />
      <button
        onClick={() => {
          dispatch(delProject({ projectId: projectId }));
          setProjectId("");
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
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder="Project ID To Add Task"
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
              projectId: projectId,
              sectionName: sectionName,
              taskName: taskName,
            })
          );
          setSectionName("");
          setProjectId("");
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
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder="Project ID To Dell Task"
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
              projectId: projectId,
              sectionName: sectionName,
              id: taskId,
            })
          );
          setSectionName("");
          setProjectId("");
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
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder="Project ID To Add Subtask"
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
              projectId: projectId,
              sectionName: sectionName,
              taskId: taskId,
              subtaskName: taskName,
            })
          );
          setSectionName("");
          setProjectId("");
          setTaskName("");
        }}
      >
        addSubtask
      </button>
    </div>
  );
}
