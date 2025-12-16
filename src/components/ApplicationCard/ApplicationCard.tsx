import { useState } from "react";
import { Application } from "../../types";
import styles from "./ApplicationCard.module.css";
import { Button } from "../Button/Button";
import { Copy, Trash } from "../Icons";

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
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = () => {
    onDelete(application.id);
  };

  const lines = application.generatedEmail.split("\n");
  const greeting = lines[0] || "";
  const body = lines.slice(1).join("\n").trim();

  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        <p className={styles.content}>
          {greeting} <br />
          <br /> {body}
        </p>
        <div className={styles.shadow}></div>
      </div>
      <div className={styles.actions}>
        <Button
          variant="ghost"
          size="sm"
          className={styles.deleteButton}
          onClick={handleDelete}
          type="button"
          leadingIcon={<Trash />}
        >
          Delete
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={styles.copyButton}
          onClick={handleCopy}
          type="button"
          trailingIcon={<Copy />}
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </Button>
      </div>
    </div>
  );
};
