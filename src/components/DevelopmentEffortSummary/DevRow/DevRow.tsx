//Componets
import DevInput from "../../Input/DevInput/DevInput";
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
  // console.log(data, "parts");
  const { procent = null, role = null, minMd, maxMd, predictedMd, risk } = data;
  //TODO: classNames addon;
  return (
    <div className={`${styles.row} ${bold ? styles.bold : null}`}>
      <div className={`${styles.cell} ${styles.name}`}>{name}</div>
      <div className={`${styles.cell} ${styles.procent} p-d-flex`}>
        <DevInput data={procent} />
      </div>
      <div className={`${styles.cell} ${styles.role}`}>{role}</div>
      <div className={`${styles.cell} ${styles.min}`}>{minMd}</div>
      <div className={`${styles.cell} ${styles.max}`}>{maxMd}</div>
      <div className={`${styles.cell} ${styles.predict}`}>{predictedMd}</div>
      <div className={`${styles.cell} ${styles.risk}`}>{risk}</div>
    </div>
  );
};

export default DevRow;
