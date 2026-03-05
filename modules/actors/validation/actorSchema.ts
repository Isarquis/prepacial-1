import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),

  photo: z
    .string()
    .url({ message: "Photo must be a valid URL." }),

  nationality: z
    .string()
    .min(2, { message: "Nationality must be at least 2 characters long." }),

  birthDate: z
    .string().date().
    min(1, { message: "Birthday is required." })
    ,
    
  biography: z
    .string()
    .min(10, { message: "Biography must be at least 10 characters long." }),
});

// TypeScript type based on the schema
export type ActorFormData = z.infer<typeof serviceSchema>;