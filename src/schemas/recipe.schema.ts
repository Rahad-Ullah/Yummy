import { z } from "zod";

export const addRecipeValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  image: z.string().optional(),
  content: z.string({ required_error: "Content is required" }).optional(),
});

export const editRecipeValidationSchema = z.object({
  title: z.string({ required_error: "Title is required" }).optional(),
  image: z.string().optional(),
  content: z.string({ required_error: "Content is required" }).optional(),
});
