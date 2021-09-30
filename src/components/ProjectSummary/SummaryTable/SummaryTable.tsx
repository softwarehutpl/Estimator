import { FC } from 'react';

import { Main } from '../../../types/Interface';

import styles from './SummaryTable.module.scss';
import SummaryRow from '../SummaryRow/SummaryRow';
import SummaryHeader from '../SummaryHeader/SummaryHeader';
import SummaryDeliveryRow from '../SummaryDeliveryRow/SummaryDeliveryRow';

interface Props {
  projectId: string;
  summary: Main[];
}

const ProjectSummary: FC<Props> = ({ summary }) => {
  return (
    <div className={styles.projectSummaryWrapper}>
      <SummaryHeader />
      {summary.map((row) => {
        if (row.name?.includes('Delivery')) {
          return <SummaryDeliveryRow key={row.name} dataRow={row} />;
        }
        return <SummaryRow key={row.name} rowData={row} />;
      })}
    </div>
  );
};

export default ProjectSummary;
