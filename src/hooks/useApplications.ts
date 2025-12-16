import { useState, useCallback, useEffect } from "react";
import { Application } from "../types";
import {
  getApplications,
  saveApplications,
  generateId,
} from "../utils/localStorage";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>(() =>
    getApplications()
  );

  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  const addApplication = useCallback(
    (data: Omit<Application, "id" | "createdAt">): Application => {
      const application: Application = {
        ...data,
        id: generateId(),
        createdAt: Date.now(),
      };
      setApplications((prev) => [application, ...prev]);
      return application;
    },
    []
  );

  const removeApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  const count = applications.length;
  const goal = 5;
  const remaining = Math.max(0, goal - count);

  return {
    applications,
    addApplication,
    removeApplication,
    count,
    goal,
    remaining,
  };
};
