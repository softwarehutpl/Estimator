import React from "react";
import styles from "./nav.module.scss";

interface Props {}

const Nav = (props: Props) => {
  return (
    <nav className={styles.nav}>
      <h1>Nav Works</h1>
    </nav>
  );
};
export default Nav;
