import { FC, useState } from 'react';
import { Project, Section } from '../../../types/Interface';

import TableHeader from '../TableHeader/TableHeader';
import TableSection from '../TableSection/TableSection';

import styles from './EstimateTable.module.scss';

interface Props {
  projectId: string;
  project: Project;
}

const EstimateTable: FC<Props> = ({ projectId, project }) => {
  //TODO if project with given Id does not exist display something else than table
  if (!project) return null;

  return (
    <div className={styles.mainTable}>
      <TableHeader />
      {project.sections?.map((section: Section) => (
        <TableSection key={section.sectionId} projectId={projectId} section={section} />
      ))}
    </div>
  );
};

export default EstimateTable;
