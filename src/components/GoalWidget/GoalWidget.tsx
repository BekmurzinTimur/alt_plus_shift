import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Progress } from "../Progress";
import styles from "./GoalWidget.module.css";

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
        Generate and send out couple more job applications today to get hired
        faster
      </p>
      <div className={styles.button}>
        <Link to="/generate">
          <Button>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Create New
          </Button>
        </Link>
      </div>
      <div className={styles.progress}>
        <Progress current={current} total={total} variant="bars" />
        <span className={styles.progressText}>
          {current} out of {total}
        </span>
      </div>
    </div>
  );
};
