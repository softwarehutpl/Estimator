//Components
import DevRow from "./DevRow/DevRow";
//Types
import { RawDevelopmentEffortSum } from "../../types/Interface";
//Styles
import styles from "./developmentEffortSummary.module.scss";
interface Props {
  projectId: string;
  data: RawDevelopmentEffortSum | undefined;
}

const DevelopmentEffortSummary = (props: Props) => {
  const { data } = props;
  console.log(data && data.name);
  return (
    <div className={styles.summary}>
      <DevRow>{data && data.name}</DevRow>
    </div>
  );
};

export default DevelopmentEffortSummary;
