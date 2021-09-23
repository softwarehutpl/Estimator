import { useState } from "react";
//components
import { Fieldset } from "primereact/fieldset";
import ProjectTile from "../../components/Tiles/ProjectTile/ProjectTile";
import CardTile from "../../components/Tiles/CardTile/CardTile";
//Store Hooks
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addProject } from "../../store/reducers/projectReducer";
//Styles
import styles from "./home.module.scss";
import { Project } from "../../types/Interface";
//Utils
import { v4 as uuidv4 } from "uuid";

interface Props {}

const Home = (props: Props) => {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState("Project name");
  const [joinId, setJoinId] = useState("Connection Id");
  const projectsData = useAppSelector((state) =>
    state.projects.projects.map((project: Project) =>
      Object.create({
        projectName: project.projectName,
        projectId: project.projectId,
      })
    )
  );

  const generatedId = uuidv4();
  //For Web RTC conncection;
  const remoteId = "";

  const createProjectHandler = () => {
    console.log("Create Project works");
    const id = dispatch(
      addProject({
        projectName: projectName,
        projectId: generatedId,
      })
    );
    console.log(`Project ID: `);
    console.log(id);
  };

  const joinProjectHandler = () => {
    console.log("Join Project");
  };
  return (
    <>
      <div className={`${styles.home} p-d-flex`}>
        <CardTile
          btn="Create New"
          title="Create new Project"
          placeholder={projectName}
          action={createProjectHandler}
          change={(e) => setProjectName(e.target.value)}
          projectId={generatedId}
        />
        <CardTile
          btn="Join"
          title="Join"
          placeholder={joinId}
          action={() => joinProjectHandler}
          change={(e) => setJoinId(e.target.value)}
          projectId={remoteId}
        />
      </div>
      <Fieldset legend="Projects" collapsed={false} toggleable>
        <ul className={styles.list}>
          {projectsData.map((project: Project) => (
            <ProjectTile
              key={project.projectId}
              projectId={project.projectId}
              title={project.projectName}
            />
          ))}
        </ul>
      </Fieldset>
    </>
  );
};

export default Home;
