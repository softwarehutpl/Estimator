import React from "react";
import styles from "./host.module.scss";

interface Props {}

const Host = (props: Props) => {
  return (
    <div className={styles.host}>
      <span>You are host of:</span>
      <span>#dk0cd8930</span>
    </div>
  );
};

export default Host;
