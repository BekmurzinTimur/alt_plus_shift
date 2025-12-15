import { useState } from 'react';
import styles from './ResultDisplay.module.css';

interface ResultDisplayProps {
  result: string | null;
  isLoading: boolean;
}

export const ResultDisplay = ({ result, isLoading }: ResultDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const hasContent = result !== null;

  return (
    <div
      className={`${styles.container} ${
        hasContent ? styles.containerWithContent : ''
      }`}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span className={styles.loadingText}>
            Generating your cover letter...
          </span>
        </div>
      ) : result ? (
        <>
          <div className={styles.content}>{result}</div>
          <div className={styles.footer}>
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
        </>
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderText}>
            Your personalized job application will appear here...
          </span>
        </div>
      )}
    </div>
  );
};
