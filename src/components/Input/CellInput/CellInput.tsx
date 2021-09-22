import { FC, useState } from 'react';

interface IProps {
	value: number | string | null;
}

const CellInput: FC<IProps> = ({ value }) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	if (!isActive) return <p onClick={() => setIsActive(!isActive)}>{value}</p>;

	return (
		<div onClick={() => setIsActive(!isActive)}>
			<input type='number' min='0' max='1000'></input>
		</div>
	);
};

export default CellInput;
