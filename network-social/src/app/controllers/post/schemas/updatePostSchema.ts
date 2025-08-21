import z from "zod";

export const updatePostSchema = z
  .object({
    content: z.string().max(1000).optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.content !== undefined || data.imageUrl !== undefined, {
    message: "Pelo menos um campo deve ser enviado.",
    path: ["content"],
  });

export type updatePostBody = z.infer<typeof updatePostSchema>;
