import { useState } from 'react';
import { Header } from '../../components/Header';
import { ApplicationForm } from '../../components/ApplicationForm';
import { ResultDisplay } from '../../components/ResultDisplay';
import { GoalWidget } from '../../components/GoalWidget';
import { useApplications } from '../../hooks/useApplications';
import { useGenerateEmail } from '../../hooks/useGenerateEmail';
import { ApplicationFormData } from '../../types';
import styles from './GeneratorPage.module.css';

export const GeneratorPage = () => {
  const { addApplication, count, goal, refresh } = useApplications();
  const generateMutation = useGenerateEmail();
  const [result, setResult] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<ApplicationFormData | null>(
    null
  );

  const handleSubmit = async (data: ApplicationFormData) => {
    setLastFormData(data);

    try {
      const generatedEmail = await generateMutation.mutateAsync(data);
      setResult(generatedEmail);

      addApplication({
        ...data,
        generatedEmail,
      });

      refresh();
    } catch (error) {
      console.error('Failed to generate email:', error);
      alert(
        error instanceof Error ? error.message : 'Failed to generate email'
      );
    }
  };

  const hasResult = result !== null;

  return (
    <div className={styles.page}>
      <Header current={count} total={goal} />

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <ApplicationForm
            onSubmit={handleSubmit}
            isLoading={generateMutation.isPending}
            hasResult={hasResult}
          />

          {hasResult && <GoalWidget current={count} total={goal} />}
        </div>

        <div className={styles.rightColumn}>
          <ResultDisplay
            result={result}
            isLoading={generateMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};
