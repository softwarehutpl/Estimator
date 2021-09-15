// import React from "react";

// function App() {
//   return <div>Hello world!</div>;
// }

// export default App;

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  initialProjects,
  clearProjects,
  addProject,
} from "./store/projectsSlice";

export default function App() {
  const [projectName, setProjectName] = useState("");
  const [estimatedBy, setEstimatedBy] = useState("");
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <div>
      <p>---------- INITIAL PROJECT ----------</p>
      <button onClick={() => dispatch(initialProjects())}>
        initialProjects
      </button>
      <button onClick={() => dispatch(clearProjects())}>clearProjects</button>
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
            addProject({ projectName: projectName, estimatedBy: estimatedBy })
          );
          setProjectName("");
          setEstimatedBy("");
        }}
      >
        addProject
      </button>
    </div>
  );
}
