import { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateSubtask, updateTasks } from '../../../store/reducers/projectReducer';
import { getSeverityLevel } from '../../../utils/getSeverityLevel';
import { getProjectSelector } from '../../../store/selectors/selectors';

import { Multiplicators, Params, Fields, Task, Project } from '../../../types/Interface';

import { Badge } from 'primereact/badge';
import styles from './RiskBadge.module.scss';
import { riskMultiplicator } from '../../../constants/constants';

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

  const project: Project = useAppSelector(getProjectSelector(projectId));

  const task = project.sections
    ?.find((section) => section.name === sectionName)
    ?.tasks.find((task) => task.id === taskId)!;

  const predictedValue = (data: Task, risk: string): number => {
    if (!data) return 0;

    // console.log(data);

    const { maxMd, minMd } = data;

    if (!maxMd || !minMd) return 0;

    // console.log((maxMd - minMd) / 2);
    // console.log(riskMultiplicator[risk]);
    // console.log(((maxMd - minMd) / 2) * riskMultiplicator[risk]);

    return ((maxMd - minMd) / 2) * riskMultiplicator[risk];
  };

  const handleRiskChange = (newRisk: string) => {
    //TODO add recalculate values !!

    if (risk === newRisk) return;

    if (!parentTaskId) {
      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.RISK,
          updatedValue: newRisk,
        })
      );

      // console.log('new predict', predictedValue(task, newRisk));
      dispatch(
        updateTasks({
          projectId,
          sectionName,
          taskId,
          taskProps: Fields.PREDICTED_MD,
          updatedValue: predictedValue(task, newRisk),
        })
      );

      return;
    }

    dispatch(
      updateSubtask({
        projectId,
        sectionName,
        taskId: parentTaskId,
        subtaskId: taskId,
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
        <div className={`${styles.riskMenu}`}>
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
