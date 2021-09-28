//Componets
import DevInputNumber from "../../Input/DevInput/DevInputNumber";
import DevInputText from "../../Input/DevInput/DevInputText";
//Types
import { FC } from "react";
import { Part, Main } from "../../../types/Interface";
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
        {bold ? null : <DevInputNumber data={parseInt(procent, 10)} />}
      </div>
      <div className={`${styles.cell} ${styles.role}`}>
        {bold ? null : <DevInputText data={role} />}
      </div>
      <div className={`${styles.cell} ${styles.min}`}>{minMd}</div>
      <div className={`${styles.cell} ${styles.max}`}>{maxMd}</div>
      <div className={`${styles.cell} ${styles.predict}`}>{predictedMd}</div>
      <div className={`${styles.cell} ${styles.risk}`}>{risk}%</div>
    </div>
  );
};

export default DevRow;
