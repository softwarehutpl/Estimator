import React from "react";
//Components
import Button from "../Button/Button";
import Host from "../Host/Host";
import Select from "../Select/Select";

import styles from "./nav.module.scss";

interface Props {}

const Nav = (props: Props) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Estimator</div>
      <Button text="Import" />
      <Button text="Export" />
      <Button text="Invite" />
      <Button text="Join" />
      <Host />
      <Select />
    </nav>
  );
};
export default Nav;
