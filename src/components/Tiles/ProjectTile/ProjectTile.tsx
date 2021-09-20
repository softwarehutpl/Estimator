import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import styles from "./projectTile.module.scss";

interface Props {
  title: string;
}

const ProjectTile = (props: Props) => {
  const { title } = props;
  return (
    <>
      <li className={`${styles.listItem} p-d-flex p-ai-center p-jc-between`}>
        <h3>{title}</h3>
        <Link to="/project" className="p-ai-center">
          <Button label="Open" className="p-button-warning p-button-raised" />
        </Link>
      </li>
    </>
  );
};

export default ProjectTile;
