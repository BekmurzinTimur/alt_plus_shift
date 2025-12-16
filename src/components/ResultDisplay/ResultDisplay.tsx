import { useState } from "react";
import styles from "./ResultDisplay.module.css";
import cn from "classnames";
import { Loading } from "../Loading";
import { Button } from "../Button/Button";
import { Copy } from "../Icons";

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
          <div className={styles.result}>
            {result.split("\n").map((line, i) => (
              <div key={i}>{line || <br />}</div>
            ))}
          </div>
          <div className={styles.footer}>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={handleCopy}
              trailingIcon={<Copy />}
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </Button>
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
