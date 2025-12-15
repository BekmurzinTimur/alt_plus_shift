import { useState } from "react";
import styles from "./ResultDisplay.module.css";
import cn from "classnames";
import { Loading } from "../Loading";

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
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : result ? (
        <>
          <div className={styles.result}>{result}</div>
          <div className={styles.footer}>
            <button
              className={cn(styles.copyButton, {
                [styles.hasContent]: !!result,
              })}
              type="button"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy to clipboard"}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_23_2217)">
                  <path
                    d="M6.6665 6.66675V4.33341C6.6665 3.39999 6.6665 2.93328 6.84816 2.57676C7.00795 2.26316 7.26292 2.00819 7.57652 1.8484C7.93304 1.66675 8.39975 1.66675 9.33317 1.66675H15.6665C16.5999 1.66675 17.0666 1.66675 17.4232 1.8484C17.7368 2.00819 17.9917 2.26316 18.1515 2.57676C18.3332 2.93328 18.3332 3.39999 18.3332 4.33341V10.6667C18.3332 11.6002 18.3332 12.0669 18.1515 12.4234C17.9917 12.737 17.7368 12.992 17.4232 13.1518C17.0666 13.3334 16.5999 13.3334 15.6665 13.3334H13.3332M4.33317 18.3334H10.6665C11.5999 18.3334 12.0666 18.3334 12.4232 18.1518C12.7368 17.992 12.9917 17.737 13.1515 17.4234C13.3332 17.0669 13.3332 16.6002 13.3332 15.6667V9.33341C13.3332 8.39999 13.3332 7.93328 13.1515 7.57676C12.9917 7.26316 12.7368 7.00819 12.4232 6.8484C12.0666 6.66675 11.5999 6.66675 10.6665 6.66675H4.33317C3.39975 6.66675 2.93304 6.66675 2.57652 6.8484C2.26292 7.00819 2.00795 7.26316 1.84816 7.57676C1.6665 7.93328 1.6665 8.39999 1.6665 9.33341V15.6667C1.6665 16.6002 1.6665 17.0669 1.84816 17.4234C2.00795 17.737 2.26292 17.992 2.57652 18.1518C2.93304 18.3334 3.39975 18.3334 4.33317 18.3334Z"
                    stroke="#475467"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_23_2217">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </>
      ) : (
        <span className={styles.placeholderText}>
          Your personalized job application will appear here...
        </span>
      )}
    </div>
  );
};
