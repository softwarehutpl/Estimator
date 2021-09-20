import { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "./cardTitle.module.scss";

interface Props {
  btn: string;
  title: string;
  default: string;
}

const CardTile = (props: Props) => {
  const { btn, title } = props;
  const [projectName, setProjectName] = useState("");

  const createProjectHandler = () => {
    console.log(projectName);
    setProjectName("");
  };

  return (
    <Card title={title} className={styles.card}>
      <div className="p-d-flex p-flex-column">
        <InputText
          id="projectName"
          value={projectName}
          placeholder={title}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button
          label={btn}
          onClick={createProjectHandler}
          className={`${styles.btn} p-my-3`}
        />
      </div>
    </Card>
  );
};

export default CardTile;
