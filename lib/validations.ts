import * as z from "zod";

export const QuestionsFormSchema = z.object({
  title: z.string().min(10).max(130),
  explanation: z.string().min(50),
  tags: z.array(z.string().min(2).max(15)).min(1).max(3),
});

export const AnswerFormSchema = z.object({
  answer: z.string().min(50),
});

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
});
