import z from "zod";

export const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export type SignInBody = z.infer<typeof signInSchema>;
