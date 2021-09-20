import { Fieldset } from "primereact/fieldset";
import ProjectTile from "../../components/Tiles/ProjectTile/ProjectTile";
import CardTile from "../../components/Tiles/CardTile/CardTile";
import styles from "./home.module.scss";

interface Props {}

const data = ["First born project", "Second child", "Meh"];

const Home = (props: Props) => {
  return (
    <>
      <div className={`${styles.home} p-d-flex`}>
        <CardTile
          btn="Create New"
          title="Create Project"
          default="Create new project"
        />
        <CardTile btn="Join" title="Join" default="Connection Id" />
      </div>
      <Fieldset legend="Projects" collapsed={false} toggleable>
        <ul className={styles.list}>
          {data.map((project) => (
            <ProjectTile key={project} title={project} />
          ))}
        </ul>
      </Fieldset>
    </>
  );
};

export default Home;
