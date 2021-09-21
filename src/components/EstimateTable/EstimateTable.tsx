import { FC, useState } from "react";

import { projects } from "../../data.json";

import TableHeader from "../Table/TableHeader/TableHeader";
import TableSection from "../Table/TableSection/TableSection";

import styles from "./Table/EstimateTable/EstimateTable.module.scss";

interface Props {
  projectId: string;
}

const EstimateTable: FC<Props> = ({ projectId }) => {
  const [sections, setSections] = useState(projects[0].sections);

  return (
    <div className={styles.mainTable}>
      <TableHeader />
      {sections.map((section) => (
        <TableSection key={section.sectionId} section={section} />
      ))}
    </div>
  );
};

export default EstimateTable;
