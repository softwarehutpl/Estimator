import React from "react";
import styles from "./home.module.scss";

interface Props {}

const Home = (props: Props) => {
  return (
    <div className={styles.home}>
      <h2>Home vie works</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et
        laudantium deserunt tenetur, voluptas repellendus nemo labore id
        voluptatibus sapiente ut? Fugiat assumenda aliquam non vitae ipsam
        veniam sint ducimus?
      </p>
    </div>
  );
};

export default Home;
