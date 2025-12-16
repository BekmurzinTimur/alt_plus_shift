import { useState } from "react";
import cn from "classnames";
import { Header } from "../../components/Header";
import { ApplicationForm } from "../../components/ApplicationForm";
import { ResultDisplay } from "../../components/ResultDisplay";
import { GoalWidget } from "../../components/GoalWidget";
import { useApplications } from "../../hooks/useApplications";
import { useGenerateEmail } from "../../hooks/useGenerateEmail";
import { ApplicationFormData } from "../../types";

import styles from "./GeneratorPage.module.css";

export const GeneratorPage = () => {
  const { addApplication, removeApplication, count, goal, refresh } =
    useApplications();
  const generateMutation = useGenerateEmail();
  const [result, setResult] = useState<string | null>(null);
  const [lastApplicationId, setLastApplicationId] = useState<string | null>(
    null
  );

  const handleSubmit = async (data: ApplicationFormData) => {
    try {
      // Таймаут нужен чтобы подождать пока размеры элемента обновятся
      setTimeout(
        () =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          }),
        100
      );
      const generatedEmail = await generateMutation.mutateAsync(data);
      setResult(generatedEmail);

      if (lastApplicationId) {
        removeApplication(lastApplicationId);
      }

      const newApp = addApplication({
        ...data,
        generatedEmail,
      });

      setLastApplicationId(newApp.id);

      refresh();
    } catch (error) {
      console.error("Failed to generate email:", error);
      alert(
        error instanceof Error ? error.message : "Failed to generate email"
      );
    }
  };

  const hasResult = result !== null;
  const displayGoalWidget = hasResult && count < goal;

  return (
    <div className={styles.page}>
      <Header current={count} total={goal} />

      <div
        className={cn(styles.content, {
          [styles.contentWithGoalWidget]: displayGoalWidget,
        })}
      >
        <div className={styles.leftColumn}>
          <ApplicationForm
            onSubmit={handleSubmit}
            isLoading={generateMutation.isPending}
            hasResult={hasResult}
          />
        </div>

        <div className={styles.rightColumn}>
          <ResultDisplay
            result={result}
            isLoading={generateMutation.isPending}
          />
        </div>
      </div>

      {displayGoalWidget && <GoalWidget current={count} total={goal} />}
    </div>
  );
};
