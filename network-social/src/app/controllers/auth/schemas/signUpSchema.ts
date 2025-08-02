import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.email().min(1),
  password: z.string().min(8),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
