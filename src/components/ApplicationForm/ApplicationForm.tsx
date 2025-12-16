import { useState, FormEvent, ChangeEvent } from "react";
import { ApplicationFormData } from "../../types";
import { Button } from "../Button";
import styles from "./ApplicationForm.module.css";
import cn from "classnames";
import { Plus, Repeat } from "../Icons";

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  isLoading: boolean;
  hasResult: boolean;
}

const MAX_CHARS = 1200;

export const ApplicationForm = ({
  onSubmit,
  isLoading,
  hasResult,
}: ApplicationFormProps) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    jobTitle: "",
    company: "",
    skills: "",
    additionalDetails: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const title =
    formData.jobTitle && formData.company ? (
      <>
        {formData.jobTitle},<wbr /> {formData.company}
      </>
    ) : (
      formData.jobTitle || formData.company || "New Application"
    );

  const charCount = formData.additionalDetails.length;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1
        className={cn(styles.title, {
          [styles.secondary]: !formData.jobTitle && !formData.company,
        })}
      >
        {title}
      </h1>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="jobTitle">
            Job title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            className={styles.input}
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Product manager"
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className={styles.input}
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Apple"
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="skills">
          I am good at...
        </label>
        <input
          id="skills"
          name="skills"
          type="text"
          className={styles.input}
          value={formData.skills}
          onChange={handleChange}
          placeholder="e.g. HTML, CSS and doing things in time"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="additionalDetails">
          Additional details
        </label>
        <textarea
          id="additionalDetails"
          name="additionalDetails"
          className={cn(styles.input, styles.textarea, {
            [styles.limitError]: charCount > MAX_CHARS,
          })}
          value={formData.additionalDetails}
          onChange={handleChange}
          placeholder="Tell us more about why you're a great fit..."
        />
        <div
          className={cn(styles.charCount, {
            [styles.charCountError]: charCount > MAX_CHARS,
          })}
        >
          {charCount}/{MAX_CHARS}
        </div>
      </div>

      {hasResult ? (
        <Button
          type="submit"
          variant="outlined"
          size="lg"
          fullWidth
          disabled={isLoading || charCount > MAX_CHARS}
          isLoading={isLoading}
          leadingIcon={<Repeat />}
        >
          Try again
        </Button>
      ) : (
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isLoading || charCount > MAX_CHARS}
          isLoading={isLoading}
          leadingIcon={<Plus />}
        >
          Generate Now
        </Button>
      )}
    </form>
  );
};
