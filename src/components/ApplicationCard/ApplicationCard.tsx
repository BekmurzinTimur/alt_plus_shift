import { useState } from 'react';
import { Application } from '../../types';
import styles from './ApplicationCard.module.css';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: string) => void;
}

export const ApplicationCard = ({
  application,
  onDelete,
}: ApplicationCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(application.generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = () => {
    onDelete(application.id);
  };

  const lines = application.generatedEmail.split('\n');
  const greeting = lines[0] || '';
  const body = lines.slice(1).join('\n').trim();

  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        <p className={styles.greeting}>{greeting}</p>
        <p className={styles.content}>{body}</p>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          type="button"
        >
          <svg
            className={styles.deleteIcon}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H14M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Delete
        </button>
        <button
          className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          type="button"
        >
          Copy to clipboard
          <svg
            className={styles.copyIcon}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="9"
              height="9"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M11 5V3C11 2.44772 10.5523 2 10 2H3C2.44772 2 2 2.44772 2 3V10C2 10.5523 2.44772 11 3 11H5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
