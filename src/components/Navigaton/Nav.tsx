import { FC, useState, useEffect } from "react";
//Components
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import ImportDialog from "../Dialogs/ImportDialog";
import ExportDialog from "../Dialogs/ExportDialog";
import InviteDialog from "../Dialogs/InviteDialog";
import JoinDialog from "../Dialogs/JoinDialog";
import TerminateDialog from "../Dialogs/TerminateDialog";
//Types
import { Params, Project } from "../../types/Interface";
//Router
import { Route, useParams, useHistory, Link } from "react-router-dom";
//Store
import { useAppSelector } from "../../store/hooks";
import {
  getProjectsDataSelector,
  getProjectSelector,
} from "../../store/selectors/selectors";
//Styles
import styles from "./nav.module.scss";

interface Props {}

const Nav: FC<Props> = () => {
  const history = useHistory();
  //Selectors
  const { projectId } = useParams<Params>();
  const project = useAppSelector(getProjectSelector(projectId));
  const projectsData = useAppSelector(getProjectsDataSelector());
  console.log(projectsData);
  //Dialogs state
  const [selectedProject, setSelectedProject] = useState(
    projectId && project.projectName
  );
  const [importDialog, setImportDialog] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);
  const [joinDialog, setJoinDialog] = useState(false);
  const [terminateDialog, setTerminateDialog] = useState(false);
  //Buttons state
  const [isConnected, setIsConnected] = useState(false);

  const projectTitles = projectsData.map((project: Project) => {
    return {
      label: project.projectName,
      value: project.projectId,
    };
  });

  useEffect(() => {
    setSelectedProject(projectId && project.projectName);
  }, [projectId]);

  const selectHandler = (e: DropdownChangeParams) => {
    console.log("dzialam");
    //TODO: handel Route here
    setSelectedProject(e.target.value);
    console.log(e.target.value);
    history.push(`/project/${e.target.value}`);
  };

  const dialogFooter = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setImportDialog(false)}
        className="p-button-secondary p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setImportDialog(false)}
        autoFocus
        className="p-button-secondary p-button-text"
      />
    </div>
  );

  const leftContents = (
    <div className="p-d-flex">
      <Link className={styles.link} to="/">
        <div className={`${styles.estimator} p-text-center`}>Estimator</div>
      </Link>

      <Route path="/project">
        <>
          <Button
            label="Import"
            className="p-button-secondary p-mx-2 p-my-auto"
            onClick={() => setImportDialog(true)}
          />
          <Button
            label="Export"
            className="p-button-secondary p-mx-2 p-my-auto"
            onClick={() => setExportDialog(true)}
          />
          <Button
            label="Invite"
            className="p-button-secondary p-mx-2 p-my-auto"
            onClick={() => setInviteDialog(true)}
          />
          <Button
            label="Join"
            className="p-button-secondary p-mx-2 p-my-auto"
            onClick={() => setJoinDialog(true)}
          />
        </>
      </Route>

      <Dialog
        header="Import from file"
        visible={importDialog}
        onHide={() => setImportDialog(false)}
        modal
        footer={dialogFooter}
      >
        <ImportDialog />
      </Dialog>
      <Dialog
        header="Export to file"
        visible={exportDialog}
        onHide={() => setExportDialog(false)}
        modal
        footer={dialogFooter}
      >
        <ExportDialog />
      </Dialog>
      <Dialog
        header="Invite from file"
        visible={inviteDialog}
        onHide={() => setInviteDialog(false)}
        modal
        footer={dialogFooter}
      >
        <InviteDialog />
      </Dialog>
      <Dialog
        header="Join from file"
        visible={joinDialog}
        onHide={() => setJoinDialog(false)}
        modal
        footer={dialogFooter}
      >
        <JoinDialog />
      </Dialog>
    </div>
  );

  const rightContents = (
    <>
      {isConnected ? (
        <Button
          className="p-button-secondary p-mx-2"
          label="Terminate"
          onClick={() => setTerminateDialog(true)}
        />
      ) : null}

      <Route path="/project">
        <Dropdown
          className={`${styles.select} p-mx-2`}
          placeholder={selectedProject}
          value={selectedProject}
          options={projectTitles}
          onChange={selectHandler}
        />
      </Route>
      <Dialog
        header="Are you sure you want to terminate connection
        ?"
        visible={terminateDialog}
        onHide={() => setTerminateDialog(false)}
        modal
        footer={dialogFooter}
      >
        <TerminateDialog />
      </Dialog>
    </>
  );

  return (
    <Toolbar className={styles.nav} left={leftContents} right={rightContents} />
  );
};
export default Nav;
