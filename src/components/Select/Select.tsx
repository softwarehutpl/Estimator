import React from "react";
import styles from "./select.module.scss";

interface Props {}

const Select = (props: Props) => {
  return <select name="selectProject" className={styles.select}></select>;
};

export default Select;
