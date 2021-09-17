import { FC } from 'react';

interface IProps {
	handleToggleExpand: () => void;
	isExpanded: boolean;
	role: string;
}

const TableRowExpander: FC<IProps> = ({ handleToggleExpand, isExpanded, role }) => {
	return (
		//TODO add styles to separate file
		<td key={role} style={{ padding: '10px' }} onClick={handleToggleExpand}>
			{isExpanded ? (
				<i className='fas fa-chevron-down'></i>
			) : (
				<i className='fas fa-chevron-right'></i>
			)}
		</td>
	);
};

export default TableRowExpander;
