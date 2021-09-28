import { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { recalculateAfterInputChange } from '../../../store/reducers/projectReducer';
import { getSeverityLevel } from '../../../utils/getSeverityLevel';
import { riskMultiplicator } from '../../../constants/constants';

import { Multiplicators, Params, Fields } from '../../../types/Interface';

import { Badge } from 'primereact/badge';
import styles from './RiskBadge.module.scss';

interface IProps {
  openedMenuId: string | null;
  parentTaskId?: string;
  risk: string;
  sectionName: string;
  setopenedMenuId: Dispatch<SetStateAction<string | null>>;
  taskId: string;
}

const RiskBadge: FC<IProps> = ({
  openedMenuId,
  parentTaskId,
  risk,
  sectionName,
  setopenedMenuId,
  taskId,
}) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams<Params>();

  const handleRiskChange = (newRisk: string) => {
    if (risk === newRisk) return;

    dispatch(
      recalculateAfterInputChange({
        projectId,
        sectionName,
        taskId: parentTaskId || taskId,
        subtaskId: (parentTaskId && taskId) || '',
        taskProps: Fields.RISK,
        updatedValue: newRisk,
      })
    );
  };

  const handleToggleRiskMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (openedMenuId === taskId) {
      setopenedMenuId(null);
      return;
    }

    setopenedMenuId(taskId);
  };

  return (
    <div className={styles.riskWrapper} onClick={(e) => handleToggleRiskMenu(e)}>
      <Badge className={styles.badge} value={risk} severity={getSeverityLevel(risk)}></Badge>
      <div className={styles.tooltip}>Risk multiplicator {riskMultiplicator[risk]}</div>
      {openedMenuId === taskId && (
        <div className={styles.riskMenu}>
          <div
            className={styles.riskMenuField}
            onClick={() => {
              handleRiskChange(Multiplicators.L);
            }}
          >
            Low
          </div>
          <div
            className={styles.riskMenuField}
            onClick={() => {
              handleRiskChange(Multiplicators.M);
            }}
          >
            Medium
          </div>
          <div
            className={styles.riskMenuField}
            onClick={() => {
              handleRiskChange(Multiplicators.H);
            }}
          >
            High
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskBadge;
