import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { ApplicationCard } from '../../components/ApplicationCard';
import { GoalWidget } from '../../components/GoalWidget';
import { Button } from '../../components/Button';
import { useApplications } from '../../hooks/useApplications';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const { applications, removeApplication, count, goal } = useApplications();

  return (
    <div className={styles.page}>
      <Header current={count} total={goal} />

      <div className={styles.titleRow}>
        <h1 className={styles.title}>Applications</h1>
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

      <div className={styles.grid}>
        {applications.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyStateTitle}>No applications yet</h2>
            <p className={styles.emptyStateText}>
              Create your first cover letter to get started
            </p>
            <Link to="/generate">
              <Button>Create your first application</Button>
            </Link>
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onDelete={removeApplication}
            />
          ))
        )}
      </div>

      <GoalWidget current={count} total={goal} />
    </div>
  );
};
