import z from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1).max(1000),
  imageUrl: z.string().optional(),
});

export type createPostBody = z.infer<typeof createPostSchema>;
