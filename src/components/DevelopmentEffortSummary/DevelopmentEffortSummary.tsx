import { FC } from "react";
//Components
import DevRow from "./DevRow/DevRow";
//Types
import { Part, Project, RawDevelopmentEffortSum } from "../../types/Interface";
//Styles
import styles from "./developmentEffortSummary.module.scss";
//Calculations
import { RDSmain } from "../../utils/formulas/RawDevelopmentSummary/main";
import { RDSparts } from "../../utils/formulas/RawDevelopmentSummary/parts";
interface Props {
  data: Project;
}

const DevelopmentEffortSummary: FC<Props> = ({ data }) => {
  const devData: any = data.rawDevelopmentEffortSum;
  let main = RDSmain(data);
  let parts = RDSparts(devData);
  return (
    <div className={styles.summary}>
      <DevRow bold={true} name={devData?.name} data={main} />
      {parts.map((item: Part) => (
        <DevRow key={item.name} name={item.name} data={item} />
      ))}
    </div>
  );
};

export default DevelopmentEffortSummary;
