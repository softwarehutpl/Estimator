import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "../../types/Interface";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  clearProjects,
  addProject,
  delProject,
  addTask,
  delTask,
  addSubtask,
} from "../reducers/projectReducer";
import { v4 as uuidv4 } from "uuid";

export default function RootStore() {
  const [projectName, setProjectName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [type, setType] = useState("group");
  const [projectId, setProjectId] = useState("");
  const projects = useAppSelector((state) => state.projects.projects);
  const projectsData = useAppSelector((state) =>
    state.projects.projects.map((project: Project) =>
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
      <nav className="p-d-flex p-jc-around">
        <Link to="/">Home</Link>
        <Link to="/project">Project</Link>
      </nav>
      <p>---------- CLEAR PROJECTS ----------</p>
      <button onClick={() => dispatch(clearProjects())}>clearProjects</button>
      <p>---------- PROJECTS NAMES ----------</p>
      {projectsData.map((project: Project) => (
        <li
          key={project.projectId}
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
              projectId: uuidv4(),
            })
          );
          setProjectName("");
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
      <p>Task / Group</p>
      <input
        type="text"
        value={type}
        onChange={(event) => setType(event.target.value)}
        placeholder="Type Task / Group"
      />
      <button
        onClick={() => {
          dispatch(
            addTask({
              projectId: projectId,
              sectionName: sectionName,
              taskName: taskName,
              type: type,
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
