import { FC, KeyboardEvent, useRef, useState } from "react";
//Components
import { InputText } from "primereact/inputtext";
//Store
import { useAppDispatch } from "../../../store/hooks";
//Types
import { PressableKeys } from "../../../types/Interface";
//Styles
import "./devInput.scss";
import styles from "./devInput.module.scss";

interface Props {
  data: string;
}

const DevInput: FC<Props> = ({ data }) => {
  const [value, setValue] = useState(data);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleSaveInput = () => {
    // dispatch()//TODO:this should update DevEfSum state
  };
  const handleCancelInput = () => {
    setValue(data);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === PressableKeys.ENTER) {
      handleSaveInput();
      inputRef.current!.blur();
    } else if (key === PressableKeys.ESCAPE) {
      handleCancelInput();
      inputRef.current!.blur();
    }
  };

  return (
    <>
      <InputText
        className={`p-inputtext-sm ${styles.input}`}
        value={value}
        onBlur={handleSaveInput}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default DevInput;
