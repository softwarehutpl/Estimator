import { FC } from "react";
//Components
import EstimateTable from "../../components/Table/EstimateTable/EstimateTable";
import ProjectSummary from "../../components/ProjectSummary/ProjectSummary";
import DevelopmentEffortSummary from "../../components/DevelopmentEffortSummary/DevelopmentEffortSummary";
//Store
import { useAppSelector } from "../../store/hooks";
import { getProjectSelector } from "../../store/selectors/selectors";
//Router
import { useParams } from "react-router";
//Types

import { Params } from "../../types/Interface";

//Styles
import styles from "./project.module.scss";

interface Props {}

const DataView: FC<Props> = () => {
  const { projectId } = useParams<Params>();
  const project = useAppSelector(getProjectSelector(projectId));
  // const devData = project.rawDevelopmentEffortSum;

  return (
    <main className={styles.contentWrapper}>
      <EstimateTable projectId={projectId} project={project} />
      <DevelopmentEffortSummary projectId={projectId} data={project} />
      <ProjectSummary projectId={projectId} />
    </main>
  );
};

export default DataView;
