import { FC } from "react";

import EstimateTable from "../../components/Table/EstimateTable/EstimateTable";
import ProjectSummary from "../../components/ProjectSummary/ProjectSummary";
import { useParams } from "react-router";

import styles from "./project.module.scss";

interface Props {}

const DataView: FC<Props> = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <main className={styles.contentWrapper}>
      <EstimateTable projectId={projectId} />
      <ProjectSummary />
    </main>
  );
};

export default DataView;
