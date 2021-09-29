import { FC, MouseEventHandler } from "react";
//Components
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
//Store
import { useAppDispatch } from "../../../store/hooks";
import { delProject } from "../../../store/reducers/projectReducer";
//Styles
import styles from "./projectTile.module.scss";

interface Props {
  title: string;
  projectId: any;
}

const ProjectTile: FC<Props> = ({ title, projectId }) => {
  const dispatch = useAppDispatch();
  const deleteHandler = () => {
    confirmDialog({
      message: `Are you sure you want to delete '${title}' project?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => dispatch(delProject({ projectId })),
      reject: () => null,
    });
  };
  return (
    <>
      <li className={`${styles.listItem} p-d-flex p-ai-center p-jc-between`}>
        <h3 className={styles.title}>{title}</h3>
        <Link
          to={`/project/${projectId}`}
          className={`${styles.link} p-ai-center`}
        >
          <Button label="Open" className="p-button-warning p-button-raised" />
        </Link>

        <Button
          className="p-button-danger p-button-raised"
          icon="pi pi-trash"
          onClick={deleteHandler}
        />
      </li>
    </>
  );
};
//TODO: Delete button should have prompt "Are you sure"

export default ProjectTile;
