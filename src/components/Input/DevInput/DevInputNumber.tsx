import { FC, useState } from "react";
import { useParams } from "react-router";
import { Params } from "../../../types/Interface";
//Components
import { InputNumber, InputNumberChangeParams } from "primereact/inputnumber";
//Store
import { useAppDispatch } from "../../../store/hooks";
import { updateParts } from "../../../store/reducers/projectReducer";
//Styles
import styles from "./devInput.module.scss";

interface Props {
  data: number;
  name: string;
}

const DevInputNumber: FC<Props> = ({ data, name }) => {
  const { projectId } = useParams<Params>();
  const [value, setValue] = useState(data);
  const dispatch = useAppDispatch();

  const handleInputSave = (e: React.FocusEvent<HTMLInputElement>) => {
    // (e) => setValue(parseInt(e.target.value, 10))
    setValue(parseInt(e.target.value, 10));
    dispatch(
      updateParts({
        projectId,
        partName: name,
        partProps: "procent",
        updatedValue: e.target.value,
      })
    );
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        console.log("Enter");
        // setValue(e.target.value);
        break;
      case "Escape":
        console.log("Escape");
        break;

      default:
        break;
    }
    console.log(e);
  };

  return (
    <>
      <InputNumber
        inputStyle={{ width: "50px" }}
        suffix=" %"
        className={`p-inputtext-sm p-d-block ${styles.input}`}
        value={value}
        onBlur={handleInputSave}
        onChange={(e) => setValue(e.value)}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default DevInputNumber;
