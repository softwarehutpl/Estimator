import { FC, MouseEvent, SetStateAction } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch } from '../../../store/hooks';
import { updateTasks } from '../../../store/reducers/projectReducer';
import { getSeverityLevel } from '../../../utils/getSeverityLevel';

import { RiskMultiplicator } from '../../../types/Interface';

import { Badge } from 'primereact/badge';
import styles from './RiskBadge.module.scss';

const riskMultiplicator: RiskMultiplicator = {
  L: 1,
  M: 1.25,
  H: 1.5,
};

interface IProps {
  openTooltipId: number | null;
  orderNumber: number;
  risk: string;
  sectionName: string;
  setOpenTooltipId: (value: SetStateAction<number | null>) => void;
  taskId: string;
}

const RiskBadge: FC<IProps> = ({
  openTooltipId,
  orderNumber,
  risk,
  sectionName,
  setOpenTooltipId,
  taskId,
}) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams<{ projectId: string }>();

  const handleRiskChange = (newRisk: string) => {
    dispatch(
      updateTasks({ projectId, sectionName, taskId, taskProps: 'risk', updatedValue: newRisk })
    );
  };

  const handleToggleRiskMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (orderNumber === openTooltipId) {
      setOpenTooltipId(null);
      return;
    }

    setOpenTooltipId(orderNumber);
  };

  return (
    <div className={styles.riskWrapper} onClick={(e) => handleToggleRiskMenu(e)}>
      <Badge className={styles.badge} value={risk} severity={getSeverityLevel(risk)}></Badge>
      <div className={styles.tooltip}>Risk multiplicator {riskMultiplicator[risk]}</div>
      {openTooltipId === orderNumber && (
        <div className={`${styles.riskMenu}`}>
          <div
            className={styles.riskMenuField}
            onClick={() => {
              handleRiskChange('L');
            }}
          >
            Low
          </div>
          <div
            className={styles.riskMenuField}
            onClick={() => {
              handleRiskChange('M');
            }}
          >
            Medium
          </div>
          <div
            className={styles.riskMenuField}
            onClick={() => {
              handleRiskChange('H');
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
