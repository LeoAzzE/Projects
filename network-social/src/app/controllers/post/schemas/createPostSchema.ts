import z from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1).max(2),
  imageUrl: z.string().optional(),
});

export type createPostBody = z.infer<typeof createPostSchema>;
