import { CheckMark } from "../Icons";
import styles from "./Progress.module.css";

interface ProgressProps {
  current: number;
  total: number;
  variant?: "dots" | "bars";
}

export const Progress = ({
  current,
  total,
  variant = "dots",
}: ProgressProps) => {
  if (current >= total && variant === "dots") return <CheckMark />;

  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`${styles[variant === "dots" ? "dot" : "bar"]} ${
            index < current ? styles.filled : ""
          }`}
        />
      ))}
    </div>
  );
};
