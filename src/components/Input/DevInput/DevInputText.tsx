import { FC, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Params } from "../../../types/Interface";

//Components
import { InputText } from "primereact/inputtext";
//Store
import { useAppDispatch } from "../../../store/hooks";
import {
  calculatePart,
  updateParts,
} from "../../../store/reducers/projectReducer";
//Styles
import styles from "./devInput.module.scss";

interface Props {
  data: string | number;
  name: string;
  type: string;
}

const DevInputText: FC<Props> = ({ data, name, type }) => {
  const { projectId } = useParams<Params>();
  const [value, setValue] = useState(data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue(data);
  }, [data, name]);

  return (
    <>
      <InputText
        className={`p-inputtext-sm p-d-block ${styles.input}`}
        value={value}
        onBlur={(e) => {
          dispatch(
            updateParts({
              projectId,
              partName: name,
              partProps: type === "procent" ? "procent" : "role",
              updatedValue: e.target.value,
            })
          );
          dispatch(
            updateParts({
              projectId,
              partName: name,
              partProps: "minMd",
              updatedValue: e.target.value,
            })
          );
          dispatch(
            updateParts({
              projectId,
              partName: name,
              partProps: "maxMd",
              updatedValue: e.target.value,
            })
          );
          dispatch(
            updateParts({
              projectId,
              partName: name,
              partProps: "predictedMd",
              updatedValue: e.target.value,
            })
          );
          setValue(e.target.value);
        }}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default DevInputText;
