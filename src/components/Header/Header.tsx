import { Link } from 'react-router-dom';
import { ProgressDots } from '../ProgressDots';
import styles from './Header.module.css';

interface HeaderProps {
  current: number;
  total: number;
}

export const Header = ({ current, total }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <svg
          className={styles.logoIcon}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 16C4 16 8 8 16 8C24 8 28 16 28 16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 12C4 12 8 4 16 4C24 4 28 12 28 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 20C4 20 8 12 16 12C24 12 28 20 28 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 24C4 24 8 16 16 16C24 16 28 24 28 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 28C4 28 8 20 16 20C24 20 28 28 28 28"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        Alt+Shift
      </Link>

      <div className={styles.rightSection}>
        <div className={styles.counter}>
          <span>
            {current}/{total} applications generated
          </span>
          <ProgressDots current={current} total={total} variant="dots" />
        </div>

        <Link to="/" className={styles.homeButton} aria-label="Go to home">
          <svg
            className={styles.homeIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
};
