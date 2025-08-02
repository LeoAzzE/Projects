import { prismaClient } from "../../../lib/prismaClient";

export class PostgresDeletePostRepository {
  async execute(postId: number) {
    try {
      return await prismaClient.post.delete({
        where: {
          id: Number(postId),
        },
      });
    } catch (error) {
      return null;
    }
  }
}
