import { ChangeEventHandler, MouseEventHandler } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import styles from "./cardTitle.module.scss";

interface Props {
  btn: string;
  title: string;
  placeholder: string;
  action: MouseEventHandler<HTMLButtonElement>;
  change: ChangeEventHandler<HTMLInputElement>;
  projectId: string | "";
}

const CardTile = (props: Props) => {
  const { btn, title, action, change, placeholder, projectId = "" } = props;

  return (
    <Card title={title} className={styles.card}>
      <div className="p-d-flex p-flex-column">
        <InputText
          id="projectName"
          value={placeholder}
          placeholder={title}
          onChange={change}
        />
        <Link to={`/project/${projectId}`}>
          <Button
            label={btn}
            onClick={action}
            className={`${styles.btn} p-my-3`}
          />
        </Link>
      </div>
    </Card>
  );
};

export default CardTile;
