import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import ProjectTile from "../../components/ProjectTile/ProjectTile";
import styles from "./home.module.scss";

interface Props {}

const data = ["First born project", "Second child", "Meh"];

const Home = (props: Props) => {
  return (
    <>
      <div className={`${styles.home} p-d-flex`}>
        <Card title="Create Project">
          <Button label="Create New" />
        </Card>
        <Card title="Join">
          <Button label="Join" />
        </Card>
      </div>
      <Fieldset legend="Projects" toggleable>
        <ul className={styles.list}>
          {data.map((project) => (
            <ProjectTile title={project} />
          ))}
        </ul>
      </Fieldset>
    </>
  );
};

export default Home;
