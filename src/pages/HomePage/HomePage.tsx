import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { ApplicationCard } from "../../components/ApplicationCard";
import { GoalWidget } from "../../components/GoalWidget";
import { Button } from "../../components/Button";
import { useApplications } from "../../hooks/useApplications";
import styles from "./HomePage.module.css";
import { Plus } from "../../components/Icons";

export const HomePage = () => {
  const { applications, removeApplication, count, goal } = useApplications();

  return (
    <div className={styles.page}>
      <Header current={count} total={goal} />

      <div className={styles.titleRow}>
        <h1 className={styles.title}>Applications</h1>
        <Link to="/generate">
          <Button leadingIcon={<Plus size={20} />} size="md">
            Create New
          </Button>
        </Link>
      </div>

      <div className={styles.grid}>
        {applications.length === 0
          ? null
          : applications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onDelete={removeApplication}
              />
            ))}
      </div>

      <GoalWidget current={count} total={goal} />
    </div>
  );
};
