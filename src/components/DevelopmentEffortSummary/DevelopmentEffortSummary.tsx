import { FC } from "react";
//Components
import DevRow from "./DevRow/DevRow";
//Types
import { RawDevelopmentEffortSum } from "../../types/Interface";
// import {DevCell} from "./DevCell/DevCell";
//Styles
import styles from "./developmentEffortSummary.module.scss";
interface Props {
  projectId: string;
  data: RawDevelopmentEffortSum;
  summary: any;
}

const DevelopmentEffortSummary: FC<Props> = ({ data, summary }) => {
  console.log(summary, "SUM");
  return (
    <div className={styles.summary}>
      <DevRow bold={true} name={data?.name} data={data?.main} />
      {data?.parts.map((item) => (
        <DevRow key={item.name} name={item.name} data={item} />
      ))}
    </div>
  );
};

export default DevelopmentEffortSummary;
