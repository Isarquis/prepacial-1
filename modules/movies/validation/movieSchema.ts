import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .min(3, { message: "Title must be at least 3 characters long." }),

  poster: z
    .string()
    .url({ message: "Poster must be a valid URL." }),


  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long." }),

  releaseDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      { message: "Release Date must be a valid date." }
    ),

  
});

// TypeScript type based on the schema
export type MovieFormData = z.infer<typeof movieSchema>;