import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Ім'я обов'язкове до заповлення")
    .max(100),

  directions: z.string().max(50),
  internactionFormat: z.string().max(50),

  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, "Invalid phone number")
    .optional(),

  type: z.enum(['partner', 'member']),
});
