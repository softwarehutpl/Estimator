import React from "react";
import styles from "./button.module.scss";
import { ButtonProps } from "../../types/button";

const Button = (props: ButtonProps) => {
  const { text, style = null } = props;
  return <button className={`${styles.btn} ${styles}.${style}`}>{text}</button>;
};

export default Button;
