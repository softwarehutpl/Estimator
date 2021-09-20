import { FC, useState } from "react";
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
import { Route } from "react-router-dom";

import styles from "./nav.module.scss";

interface Props {}

const Nav: FC<Props> = () => {
  //Dialogs state
  const [selectedProject, setSelectedProject] = useState(null);
  const [importDialog, setImportDialog] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);
  const [joinDialog, setJoinDialog] = useState(false);
  const [terminateDialog, setTerminateDialog] = useState(false);
  //Buttons state
  const [isConnected, setIsConnected] = useState(false);

  const projectTitles = [
    { label: "Project A", value: "A" },
    { label: "Project B", value: "B" },
    { label: "Project C", value: "C" },
  ];

  const selectHandler = (e: DropdownChangeParams) =>
    setSelectedProject(e.target.value);

  const dialogFooter = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setImportDialog(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setImportDialog(false)}
        autoFocus
      />
    </div>
  );

  const leftContents = (
    <div className="p-d-flex">
      <div className={`${styles.estimator} p-text-center`}>Estimator</div>

      <Route path="/project">
        <>
          <Button
            label="Import"
            className="p-mx-2 p-my-auto"
            onClick={() => setImportDialog(true)}
          />
          <Button
            label="Export"
            className="p-mx-2 p-my-auto"
            onClick={() => setExportDialog(true)}
          />
          <Button
            label="Invite"
            className="p-mx-2 p-my-auto"
            onClick={() => setInviteDialog(true)}
          />
          <Button
            label="Join"
            className="p-mx-2 p-my-auto"
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
          className="p-mx-2"
          label="Terminate"
          onClick={() => setTerminateDialog(true)}
        />
      ) : null}

      <Route path="/project">
        <Dropdown
          className={`${styles.select} p-mx-2`}
          placeholder="Select project"
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
