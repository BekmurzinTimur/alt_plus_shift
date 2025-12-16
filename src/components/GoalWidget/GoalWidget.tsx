import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Progress } from "../Progress";
import styles from "./GoalWidget.module.css";
import { Plus } from "../Icons";

interface GoalWidgetProps {
  current: number;
  total: number;
}

export const GoalWidget = ({ current, total }: GoalWidgetProps) => {
  if (current >= total) return null;
  return (
    <div className={styles.widget}>
      <h2 className={styles.title}>Hit your goal</h2>
      <p className={styles.description}>
        Generate and send out couple more job applications to get hired faster
      </p>
      <div className={styles.button}>
        <Link to="/generate">
          <Button leadingIcon={<Plus />} size="lg">
            Create New
          </Button>
        </Link>
      </div>
      <div className={styles.progress}>
        <Progress current={current} total={total} variant="bars" />
        <div className={styles.progressText}>
          {current} out of {total}
        </div>
      </div>
    </div>
  );
};
