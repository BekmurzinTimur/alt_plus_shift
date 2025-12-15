import { Link } from "react-router-dom";
import { ProgressDots } from "../ProgressDots";
import styles from "./Header.module.css";
import { Logo } from "../Logo";

interface HeaderProps {
  current: number;
  total: number;
}

export const Header = ({ current, total }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <Logo />
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
