import { FC } from 'react';
import { Project } from '../../types/Interface';
import HeaderInputDate from './HeaderInputDate/HeaderInputDate';
import HeaderInputNumber from './HeaderInputNumber/HeaderInputNumber';
import HeaderInputText from './HeaderInputText/HeaderInputText';

import styles from './ProjectHeader.module.scss';

interface IProps {
  project: Project;
}

const ProjectHeader: FC<IProps> = ({ project }) => {
  console.log(project);

  const {
    effort,
    estEns,
    estimatedBy,
    estimationDate,
    estStart,
    projectId,
    projectName,
    teamSize,
    timeBudget,
    verifiedBy,
    verificationDate,
  } = project;

  return (
    <div className={styles.projectHeaderWrapper}>
      <div className={styles.inputRowWrapper}>
        <HeaderInputText
          field={'projectName'}
          placeholder={'Project name'}
          projectId={projectId || ''}
          title={'Project name'}
          value={projectName}
        />
        <HeaderInputDate
          field={'estStart'}
          projectId={projectId || ''}
          title={'Est. start'}
          value={estStart || ''}
        />
        <HeaderInputDate
          field={'estEns'}
          projectId={projectId || ''}
          title={'Est. end'}
          value={estEns || ''}
        />
      </div>
      <div className={styles.inputRowWrapper}>
        <HeaderInputNumber
          field={'effort'}
          projectId={projectId || ''}
          title={'Effort'}
          value={effort || 0}
        />
        {'H'}
        <HeaderInputNumber
          field={'teamSize'}
          projectId={projectId || ''}
          title={'Team size (FTEs)'}
          value={teamSize || 0}
        />
        <div>
          <span>Time Budget: </span>
          {timeBudget || 0}
        </div>
        {'MD'}
      </div>
      <div className={styles.inputRowWrapper}>
        <HeaderInputText
          field={'estimatedBy'}
          title={'Estimated by'}
          value={estimatedBy || ''}
          placeholder={'Estimated by'}
          projectId={projectId || ''}
        />
        <HeaderInputDate
          field={'estimationDate'}
          projectId={projectId || ''}
          title={'Date'}
          value={estimationDate || ''}
        />
      </div>
      <div className={styles.inputRowWrapper}>
        <HeaderInputText
          field={'verifiedBy'}
          title={'Verified by'}
          value={verifiedBy || ''}
          placeholder={'Verified by'}
          projectId={projectId || ''}
        />
        <HeaderInputDate
          field={'verificationDate'}
          projectId={projectId || ''}
          title={'Date'}
          value={verificationDate || ''}
        />
      </div>
    </div>
  );
};

export default ProjectHeader;
