import styles from "./devCell.module.scss";

interface Props {
  children: any;
}

const DevCell = (props: Props) => {
  return <div className={styles.cell}>{}</div>;
};

export default DevCell;
