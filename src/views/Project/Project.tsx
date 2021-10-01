import { FC } from "react";
//Components
import EstimateTable from "../../components/Table/EstimateTable/EstimateTable";
import ProjectSummary from "../../components/ProjectSummary/SummaryTable/SummaryTable";
import DevelopmentEffortSummary from "../../components/DevelopmentEffortSummary/DevelopmentEffortSummary";
//Store
import { useAppSelector } from "../../store/hooks";
import { getProjectSelector } from "../../store/selectors/selectors";
//Router
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
//Types

import { Params } from "../../types/Interface";

//Styles
import styles from "./project.module.scss";

interface Props {}

const DataView: FC<Props> = () => {
  const { projectId } = useParams<Params>();

  const project: any = useAppSelector(getProjectSelector(projectId));
  if (!project) {
    return <Redirect to="/404" />;
  }
  const devData = project.rawDevelopmentEffortSum;

  return (
    <main className={styles.contentWrapper}>
      <EstimateTable projectId={projectId} project={project} />
      <DevelopmentEffortSummary data={project} />
      <ProjectSummary projectId={projectId} summary={project.summary} />
    </main>
  );
};

export default DataView;
