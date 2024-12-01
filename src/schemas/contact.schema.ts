import { z } from "zod";

export const contactValidationSchema = z.object({
  name: z.string().min(6, "Name must be at least 6 characters"),
  email: z.string().trim().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(6, "Message must be at least 6 characters"),
});
