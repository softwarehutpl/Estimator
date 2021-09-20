import { Fieldset } from "primereact/fieldset";
import ProjectTile from "../../components/Tiles/ProjectTile/ProjectTile";
import CardTile from "../../components/Tiles/CardTile/CardTile";
import { useAppSelector } from "../../store/hooks";
import styles from "./home.module.scss";

interface Props {}

const Home = (props: Props) => {
  const projectsData = useAppSelector((state) =>
    state.projects.projects.map((project) =>
      Object.create({
        projectName: project.projectName,
        projectId: project.projectId,
      })
    )
  );
  console.log(projectsData);
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
          {projectsData.map((project) => (
            <ProjectTile key={project.projectId} title={project.projectName} />
          ))}
        </ul>
      </Fieldset>
    </>
  );
};

export default Home;
