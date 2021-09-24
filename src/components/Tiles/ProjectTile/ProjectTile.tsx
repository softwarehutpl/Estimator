import { Button } from "primereact/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./projectTile.module.scss";

interface Props {
  title: string;
  projectId: string | undefined;
}

const ProjectTile: FC<Props> = ({ title, projectId }) => {
  return (
    <>
      <li className={`${styles.listItem} p-d-flex p-ai-center p-jc-between`}>
        <h3>{title}</h3>
        <Link
          to={`/project/${projectId}`}
          className={`${styles.link} p-ai-center`}
        >
          <Button label="Open" className="p-button-warning p-button-raised" />
        </Link>
      </li>
    </>
  );
};

export default ProjectTile;
