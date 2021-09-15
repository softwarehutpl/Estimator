import React, { useState } from "react";
//Components
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Link } from "react-router-dom";

import styles from "./nav.module.scss";

interface Props {}

const Nav = (props: Props) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const projectTitles = [
    { label: "Project A", value: "A" },
    { label: "Project B", value: "B" },
    { label: "Project C", value: "C" },
  ];

  const selectHandler = (event: any) => {
    console.log(event);
    console.log(selectedProject);
    setSelectedProject(event.currentTarget.value);
  };
  const leftContents = (
    <>
      <Button label="Import" className="p-mr-2" />
      <Button label="Export" className="p-button-success" />
      <Button label="Invite" className="p-button-success" />
      <Button label="Join" className="p-button-success" />
    </>
  );
  const rightContents = (
    <>
      <Link to="/project">Project</Link>
      <Link to="/">Home</Link>
      <Button label="Terminate" />
      <Dropdown
        className={styles.select}
        placeholder="Select project"
        value={selectedProject}
        options={projectTitles}
        onChange={selectHandler}
      />
    </>
  );
  return (
    <Toolbar className={styles.nav} left={leftContents} right={rightContents} />
  );
};
export default Nav;
