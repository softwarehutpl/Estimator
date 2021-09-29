import { FC, useState } from "react";
//Components
import { InputText } from "primereact/inputtext";
//Store
import { useAppDispatch } from "../../../store/hooks";
//Styles
import styles from "./devInput.module.scss";

interface Props {
  data: string;
}

const DevInputText: FC<Props> = ({ data }) => {
  const [value, setValue] = useState(data);
  // const dispatch = useAppDispatch();

  return (
    <>
      <InputText
        className={`p-inputtext-sm p-d-block ${styles.input}`}
        value={value}
        onBlur={(e) => setValue(e.target.value)}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default DevInputText;
