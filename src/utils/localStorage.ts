import { Application } from '../types';

const APPLICATIONS_KEY = 'alt-shift-applications';
const OPENAI_KEY = 'alt-shift-openai-key';

export const getApplications = (): Application[] => {
  try {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveApplication = (application: Application): void => {
  const applications = getApplications();
  applications.unshift(application);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
};

export const deleteApplication = (id: string): void => {
  const applications = getApplications();
  const filtered = applications.filter((app) => app.id !== id);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filtered));
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
