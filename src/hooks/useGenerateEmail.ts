import { useMutation } from "@tanstack/react-query";
import OpenAI from "openai";
import { ApplicationFormData } from "../types";

const generateEmail = async (data: ApplicationFormData): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `Write a professional cover letter for a job application with the following details:

Job Title: ${data.jobTitle}
Company: ${data.company}
Skills: ${data.skills}
Additional Details: ${data.additionalDetails}

Write a concise, professional cover letter that:
- Is addressed to the hiring team
- Highlights the candidate's relevant skills
- Shows enthusiasm for the role and company
- Is around 100-150 words
- Starts with "Dear ${data.company} team,"

Only output the cover letter text, nothing else.`;

  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: prompt,
  });

  const generatedText = response.output_text;

  if (!generatedText) {
    throw new Error("Failed to generate email");
  }

  return generatedText.trim();
};

export const useGenerateEmail = () => {
  return useMutation({
    mutationFn: generateEmail,
  });
};
