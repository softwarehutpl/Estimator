import { FC } from "react";
//Components
import DevRow from "./DevRow/DevRow";
//Types
import { Part, Project, RawDevelopmentEffortSum } from "../../types/Interface";
// import {DevCell} from "./DevCell/DevCell";
//Styles
import styles from "./developmentEffortSummary.module.scss";
import { RDSmain } from "../../utils/formulas/RawDevelopmentSummary/main";
interface Props {
  projectId: string;
  data: Project;
}

const DevelopmentEffortSummary: FC<Props> = ({ data, projectId }) => {
  // useEffect(() => {}, [data]);
  const devData: any = data.rawDevelopmentEffortSum;
  let main = RDSmain(data);
  return (
    <div className={styles.summary}>
      <DevRow bold={true} name={devData?.name} data={main} />
      {devData?.parts.map((item: Part) => (
        <DevRow key={item.name} name={item.name} data={item} />
      ))}
    </div>
  );
};

export default DevelopmentEffortSummary;
