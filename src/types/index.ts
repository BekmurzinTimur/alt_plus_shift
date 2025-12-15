export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  skills: string;
  additionalDetails: string;
  generatedEmail: string;
  createdAt: number;
}

export interface ApplicationFormData {
  jobTitle: string;
  company: string;
  skills: string;
  additionalDetails: string;
}
