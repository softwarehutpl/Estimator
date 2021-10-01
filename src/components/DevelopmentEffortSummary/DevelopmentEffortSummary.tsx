import { FC } from "react";
//Components
import DevRow from "./DevRow/DevRow";
//Types
import { Part, Project } from "../../types/Interface";
//Styles
import styles from "./developmentEffortSummary.module.scss";
interface Props {
  data: Project;
}

const DevelopmentEffortSummary: FC<Props> = ({ data }) => {
  const devData: any = data.rawDevelopmentEffortSum;

  return (
    <div className={styles.summary}>
      <DevRow bold={true} name={devData?.name} data={devData.main} />
      {devData.parts.map((item: Part) => (
        <DevRow key={item.name} name={item.name} data={item} />
      ))}
    </div>
  );
};

export default DevelopmentEffortSummary;
