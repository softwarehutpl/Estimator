import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import styles from "./home.module.scss";

interface Props {}

const Home = (props: Props) => {
  return (
    <div className={`${styles.home} p-d-flex`}>
      <Card title="Create Project">
        <Button label="Create New" />
      </Card>
      <Card title="Select Project">
        <Button label="Create" />
      </Card>
    </div>
  );
};

export default Home;
