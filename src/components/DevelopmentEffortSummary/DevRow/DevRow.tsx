//Componets
import DevInputText from "../../Input/DevInput/DevInputText";
//Types
import { FC } from "react";
//Styles
import styles from "./devRow.module.scss";

interface Props {
  data: any;
  name: string;
  bold?: boolean;
}

const DevRow: FC<Props> = ({ data, name, bold }) => {
  const { procent = null, role = null, minMd, maxMd, predictedMd, risk } = data;

  return (
    <div className={`${styles.row} ${bold ? styles.bold : null}`}>
      <div className={`${styles.cell} ${styles.name}`}>{name}</div>
      <div className={`${styles.cell} ${styles.procent} p-d-flex`}>
        {bold ? null : (
          <DevInputText
            type="procent"
            name={name}
            data={parseInt(procent, 10)}
          />
        )}
      </div>
      <div className={`${styles.cell} ${styles.role}`}>
        {bold ? null : <DevInputText type="role" name={name} data={role} />}
      </div>
      <div className={`${styles.cell} ${styles.min}`}>{minMd}</div>
      <div className={`${styles.cell} ${styles.max}`}>{maxMd}</div>
      <div className={`${styles.cell} ${styles.predict}`}>{predictedMd}</div>
      <div className={`${styles.cell} ${styles.risk}`}>
        {risk}
        {bold ? "%" : ""}
      </div>
    </div>
  );
};

export default DevRow;
