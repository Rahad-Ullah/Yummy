import { z } from "zod";

const addUserSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobileNumber: z
    .string()
    .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
  profilePhoto: z.string().optional(),
});

export default addUserSchema;
