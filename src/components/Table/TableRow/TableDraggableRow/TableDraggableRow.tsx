import { Dispatch, FC, SetStateAction, useState } from 'react';

import { rowOrder } from '../TableRow/TableRow';
import { Task } from '../../../../types/Interface';
import { getSeverityLevel } from '../../../../utils/getSeverityLevel';

import TableCell from '../../TableCell/TableCell';
import TaskComment from '../../TaskComment/TaskComment';

import { Badge } from 'primereact/badge';
import styles from './TableDraggableRow.module.scss';

interface IProps {
	data: Task;
	openTooltipId: number | null;
	orderNumber: number;
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
	openTooltipId,
	orderNumber,
	stylingClass,
	setOpenTooltipId,
}) => {
	const [newRisk, setNewRisk] = useState<string>('');

	const handleToggleTooltip = () => {
		console.log(orderNumber === openTooltipId);
		if (orderNumber === openTooltipId) {
			console.log('here');
			setOpenTooltipId(null);
			return;
		}

		setOpenTooltipId(orderNumber);
	};

	return (
		<>
			<div className={`${styles.tableRow} ${stylingClass}`}>
				{rowOrder.map(({ role }) => {
					console.log(role);

					if (role === 'risk') {
						return (
							<TableCell key={role} role={role}>
								{data.type === 'group' ? null : (
									<>
										<div className={styles.riskWrapper} onClick={() => handleToggleTooltip()}>
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
