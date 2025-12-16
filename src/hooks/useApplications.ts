import { useState, useCallback, useEffect } from "react";
import { Application } from "../types";
import {
  getApplications,
  saveApplication,
  deleteApplication,
  generateId,
} from "../utils/localStorage";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  const refresh = useCallback(() => {
    setApplications(getApplications());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addApplication = useCallback(
    (data: Omit<Application, "id" | "createdAt">): Application => {
      const application: Application = {
        ...data,
        id: generateId(),
        createdAt: Date.now(),
      };
      saveApplication(application);
      refresh();
      return application;
    },
    [refresh]
  );

  const removeApplication = useCallback(
    (id: string) => {
      deleteApplication(id);
      refresh();
    },
    [refresh]
  );

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
    refresh,
  };
};
