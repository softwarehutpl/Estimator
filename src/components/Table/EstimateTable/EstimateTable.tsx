import { FC, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Project, Section } from '../../../types/Interface';

import TableHeader from '../TableHeader/TableHeader';
import TableSection from '../TableSection/TableSection';

import styles from './EstimateTable.module.scss';

interface Props {
  projectId: string;
}

const EstimateTable: FC<Props> = ({ projectId }) => {
  //TODO delete state
  const [sections, setSections] = useState(null);

  const project: Project = useAppSelector((state) =>
    state.projects.projects.find((project: Project) => project.projectId === projectId)
  );

  //TODO if project with given Id does not exist display something else than table
  if (!project) return null;

  return (
    <div className={styles.mainTable}>
      <TableHeader />
      {project.sections?.map((section: Section) => (
        <TableSection
          key={section.sectionId}
          projectId={projectId}
          section={section}
          sections={project.sections}
          setSections={setSections}
        />
      ))}
    </div>
  );
};

export default EstimateTable;
