import { Dispatch, FC, SetStateAction, useState, MouseEvent } from 'react';

import { rowOrder } from '../TableRow/TableRow';
import { Task } from '../../../../types/Interface';
import { getSeverityLevel } from '../../../../utils/getSeverityLevel';

import TableCell from '../../TableCell/TableCell';
import TaskComment from '../../TaskComment/TaskComment';

import { Badge } from 'primereact/badge';
import styles from './TableDraggableRow.module.scss';
import { useAppDispatch } from '../../../../store/hooks';
import { addTask, delTask, reorder } from '../../../../store/reducers/projectReducer';
import { useParams } from 'react-router';

interface IProps {
	data: Task;
	index: number;
	openTooltipId: number | null;
	orderNumber: number;
	sectionName: string;
	stylingClass?: string;
	setOpenTooltipId: Dispatch<SetStateAction<number | null>>;
}

interface RiskMultiplicator {
	[key: string]: number;
}

const riskMultiplicator: RiskMultiplicator = {
	L: 1,
	M: 1.25,
	H: 1.5,
};

const TableDraggableRow: FC<IProps> = ({
	data,
	index,
	openTooltipId,
	orderNumber,
	sectionName,
	stylingClass,
	setOpenTooltipId,
}) => {
	const [newRisk, setNewRisk] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const { projectId } = useParams<{ projectId: string }>();

	const disabledComment = data.comment.text ? styles.rowControllerTaskButtonDisabled : '';

	const handleTaskAdd = () => {
		//TODO posibility to create task with diffrent type
		dispatch(addTask({ projectId, sectionName, type: 'task' }));
		dispatch(reorder({ projectId, sectionName, endIndex: index }));
	};

	const handleTaskDelete = () => {
		dispatch(delTask({ projectId, sectionName, id: data.id }));
	};

	const handleCommentAdd = () => console.log('Adding comment');

	const handleToggleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
		if (e.type === 'mouseleave' && !isOpen) {
			return;
		}

		setIsOpen(!isOpen);
	};

	const handleToggleTooltip = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (orderNumber === openTooltipId) {
			setOpenTooltipId(null);
			return;
		}

		setOpenTooltipId(orderNumber);
	};

	const handleTooltipClosed = () => setOpenTooltipId(null);

	return (
		<>
			<div
				className={`${styles.tableRow} ${stylingClass}`}
				onClick={handleTooltipClosed}
				onMouseLeave={(e) => handleToggleContextMenu(e)}
			>
				<div className={styles.rowController} onClick={(e) => handleToggleContextMenu(e)}>
					<button className={styles.rowControllerButton}>+</button>
					{isOpen && (
						<div className={styles.rowControllerButtonsWrapper}>
							<div className={styles.rowControllerTaskButton} onClick={handleTaskDelete}>
								<i className='pi pi-trash'></i>
							</div>
							<div className={styles.rowControllerTaskButton} onClick={handleTaskAdd}>
								<i className='pi pi-calendar-plus'></i>
							</div>
							<div
								className={`${styles.rowControllerTaskButton} ${disabledComment}`}
								onClick={handleCommentAdd}
							>
								<i className='pi pi-comment'></i>
							</div>
						</div>
					)}
				</div>
				{rowOrder.map(({ role }) => {
					if (role === 'risk') {
						return (
							<TableCell key={role} role={role}>
								{data.type === 'group' ? null : (
									<>
										<div className={styles.riskWrapper} onClick={(e) => handleToggleTooltip(e)}>
											<Badge
												className={styles.badge}
												value={newRisk || data[role as keyof Task]}
												severity={getSeverityLevel(newRisk || data[role])}
											></Badge>
											<div className={styles.tooltip}>
												Risk multiplicator {riskMultiplicator[newRisk || data[role]]}
											</div>
											{openTooltipId === orderNumber && (
												<div className={`${styles.riskTooltip}`}>
													<div
														className={styles.riskTooltipField}
														onClick={() => {
															setNewRisk('L');
														}}
													>
														Low
													</div>
													<div
														className={styles.riskTooltipField}
														onClick={() => {
															setNewRisk('M');
														}}
													>
														Medium
													</div>
													<div
														className={styles.riskTooltipField}
														onClick={() => {
															setNewRisk('H');
														}}
													>
														High
													</div>
												</div>
											)}
										</div>
									</>
								)}
							</TableCell>
						);
					}
					return (
						<TableCell key={role} role={role}>
							{role === 'sectionId' ? orderNumber : data[role as keyof Task]}
						</TableCell>
					);
				})}
				<TaskComment text={data.comment.text} isImportant={data.comment.isImportant} />
			</div>
		</>
	);
};

export default TableDraggableRow;
