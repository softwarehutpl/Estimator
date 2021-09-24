import { FC } from "react";

import styles from "./ProjectSummary.module.scss";

interface Props {
  projectId: string;
}

const ProjectSummary: FC<Props> = () => {
  return (
    <div className={styles.projectSummaryWrapper}>
      <div className={styles.projectSummaryContent}>
        Fixed Project Summary Table
      </div>
    </div>
  );
};

export default ProjectSummary;
