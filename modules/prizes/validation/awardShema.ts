import { z } from "zod";

export const awardSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .min(3, { message: "Title must be at least 3 characters long." }),

  year: z
    .number()
    .min(1900, { message: "Year must be 1900 or later." })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future." }),

  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters long." }),

  recipient: z
    .string()
    .min(2, { message: "Recipient must be at least 2 characters long." }),

  description: z
    .string()
    .optional(),
});

// TypeScript type based on schema
export type AwardFormData = z.infer<typeof awardSchema>;