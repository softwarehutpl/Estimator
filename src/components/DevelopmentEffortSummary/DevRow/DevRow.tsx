import { Children, FC } from "react";
import styles from "./devRow.module.scss";

interface Props {
  children: any;
}

const DevRow: FC<Props> = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};

export default DevRow;
