import { FC, useState } from "react";
//Components
import { InputNumber } from "primereact/inputnumber";
//Store
import { useAppDispatch } from "../../../store/hooks";
//Styles
import styles from "./devInput.module.scss";

interface Props {
  data: number;
}

const DevInputNumber: FC<Props> = ({ data }) => {
  const [value, setValue] = useState(data);
  // const dispatch = useAppDispatch();

  return (
    <>
      <InputNumber
        inputStyle={{ width: "50px" }}
        suffix=" %"
        className={`p-inputtext-sm p-d-block ${styles.input}`}
        value={value}
        onBlur={(e) => setValue(parseInt(e.target.value, 10))}
        onChange={(e) => setValue(e.value)}
      />
    </>
  );
};

export default DevInputNumber;
